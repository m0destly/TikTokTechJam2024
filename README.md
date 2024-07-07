# Welcome to our TikTokTechJam 2024 project!

## Prerequisites for testing
1. [Node.js](https://nodejs.org/en/download/package-manager)
2. npm
3. [MySQL](https://dev.mysql.com/downloads/mysql/)

## Instructions to test the app 
1. Install the required dependencies
   ```bash
   npm install
   ```

2. Set up MySQL if you have not done so

3. Start the local MySQL server and establish local connection

4. Create database `your_database`

5. Navigate to folder `backend`, then import the 3 .csv files `users`, `transactions` and `loans` to `your_database`

6. Edit the Node.js server file to `your_user`, `your_password` and `your_database`
   ```ruby
   const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'your_database'
   });

   const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'your_database'
   });
   ```

6. Start the Node.js server file
   ```bash
   node mysql.js
   ```

7. Start the app
   ```bash
    npx expo start
   ```

## Test Account
- Number: +65 12345678
- Verification Code: 654321
- Username: iancheah
- Password: wordpass

## Alternate Test Account 
- Number: +65 12121212
- Verification Code: 123456
- Username: yunhong
- Password: securepass