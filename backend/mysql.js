const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const SECRET_KEY = 'secure';  // Replace with a secure secret key

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tttj'
});

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tttj'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL.');
});

app.post('/register', (req, res) => {
    const { user, password, name, phone } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const query = 'INSERT INTO users (user, password, name, phone, balance, amountOwed) VALUES (?, ?, ?, ?, 0, 0)';
    db.query(query, [user, hashedPassword, name, phone], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { user, password, phone } = req.body;
    const query = 'SELECT * FROM users WHERE (user = ? AND phone = ?)';
    db.query(query, [user, phone], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        const currUser = results[0];
        const passwordIsValid = bcrypt.compareSync(password, currUser.password);
        if (!passwordIsValid) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ id: currUser.id }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours
        res.status(200).send({ auth: true, token });
    });
});

app.get('/me', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send('No token provided');
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }
        const query = 'SELECT id, user, name, phone, balance, amountOwed FROM users WHERE id = ?';
        db.query(query, [decoded.id], (err, results) => {
            if (err) {
                console.error('Error fetching user info:', err);
                return res.status(500).send('Server error');
            }
            if (results.length === 0) {
                return res.status(404).send('User not found');
            }
            res.status(200).send(results[0]);
        });
    });
});

app.post('/transfer', (req, res) => {
    const { fromUserId, toUserId, amount, fromUser, toUser } = req.body;

    if (!fromUserId || !toUserId || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    // Start a transaction
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database connection error' });
        }
        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                console.error(err);
                return res.status(500).json({ error: 'Transaction error' });
            }

            // Deduct funds from the sender
            connection.query(
                'UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?',
                [amount, fromUserId, amount],
                (err, results) => {
                    if (err || results.affectedRows === 0) {
                        return connection.rollback(() => {
                            connection.release();
                            console.error(err);
                            res.status(400).json({ error: 'Insufficient funds or invalid sender' });
                        });
                    }

                    // Add funds to the recipient
                    connection.query(
                        'UPDATE users SET balance = balance + ? WHERE id = ?',
                        [amount, toUserId],
                        (err, results) => {
                            if (err || results.affectedRows === 0) {
                                return connection.rollback(() => {
                                    connection.release();
                                    console.error(err);
                                    res.status(400).json({ error: 'Invalid recipient' });
                                });
                            }

                            // Insert transaction record
                            connection.query(
                                'INSERT INTO transactions (transactionDate, idPayer, idPayee, amount, Payer, Payee) VALUES (NOW(), ?, ?, ?, ?, ?)',
                                [fromUserId, toUserId, amount, fromUser, toUser],
                                (err, results) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            console.error(err);
                                            res.status(500).json({ error: 'Failed to record transaction' });
                                        });
                                    }

                                    // Commit the transaction
                                    connection.commit(err => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                console.error(err);
                                                res.status(500).json({ error: 'Transaction commit error' });
                                            });
                                        }

                                        connection.release();
                                        res.json({ message: 'Funds transferred and transaction recorded successfully' });
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    });
});

app.get('/getRecipientUser', (req, res) => {
    const user = req.query.user;
    const query = `SELECT name, id FROM users WHERE user = ?`;
  
    db.query(query, [user], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.length > 0) {
        res.status(200).json({ name: result[0].name, id: result[0].id });
      } else {
        res.status(404).json({ message: 'No user found' });
      }
    });
});

app.get('/getRecipientPhone', (req, res) => {
    const phone = req.query.phone;
    const query = `SELECT name, id FROM users WHERE phone = ?`;
  
    db.query(query, [phone], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.length > 0) {
        res.status(200).json({ name: result[0].name, id: result[0].id });
      } else {
        res.status(404).json({ message: 'No user found' });
      }
    });
});

app.get('/transactions', (req, res) => {
    const userID = req.query.userID;

    if (!userID) {
        return res.status(400).json({ error: 'UserID missing' });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection error:', err);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const query = `SELECT * FROM transactions WHERE idPayee = ? OR idPayer = ?`;
        connection.query(query, [userID, userID], (err, results) => {
            connection.release();

            if (err) {
                console.error('Error fetching transactions:', err);
                return res.status(500).json({ error: 'Error fetching transactions' });
            }

            res.json(results);
        });
    });
});

app.post('/loans', (req, res) => {
    const { name, interest_amount, initialAmount, finalAmount } = req.body;

    // Validate data if necessary

    // Insert into the loans table
    const insertQuery = 'INSERT INTO loans (name, interest_amount, initialAmount, finalAmount) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [name, interest_amount, initialAmount, finalAmount], (err, result) => {
        if (err) {
            console.error('Error inserting loan:', err);
            return res.status(500).send(err);
        }

        // Update the user's debt and balance in the users table
        const updateQuery = 'UPDATE users SET amountOwed = amountOwed + ?, balance = balance + ? WHERE name = ?';
        db.query(updateQuery, [finalAmount, initialAmount, name], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating user amountOwed and balance:', updateErr);
                return res.status(500).send(updateErr);
            }

            res.status(201).json({ message: 'Loan created successfully', loanId: result.insertId });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});