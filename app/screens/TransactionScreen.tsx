import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { useAppContext } from '../global/AppContext';
import axios from 'axios';

const TransactionScreen = ({navigation} : any) => {
    const { userID } = useAppContext();
    const [username, setUsername] = useState('')
    const [targetUser, setTargetUser] = useState('');
    const [targetID, setTargetID] = useState('');
    const [amount, setAmount] = useState('');

    const checkRecipient = async () => {
        try {
          const response = await fetch(`http://localhost:3000/getRecipient?user=${username}`);
          const result = await response.json();
    
          if (response.status === 200) {
            setTargetUser(result.name);
            setTargetID(result.id);
          } else if (!username){
            setTargetUser('');
            setTargetID('');
          } else {
            setTargetUser('User not found');
            setTargetID('');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const handleTransfer = async () => {
        if (!targetUser|| !amount) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/transfer', {
                fromUserId: parseInt(userID, 10),
                toUserId: parseInt(targetID, 10),
                amount: parseFloat(amount),
            });
            Alert.alert(`You have successfully transferred ${amount} to ${targetUser}.`, response.data.message);
        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', error.response?.data?.error || 'An error occurred');
        } 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transfer to Friends</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                keyboardType="numeric"
                value={username}
                onChangeText={setUsername}
                onEndEditing={checkRecipient}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            {targetUser && !targetID && (
                <>
                    <Text> {targetUser} </Text>
                </>
            )}
            {targetUser && amount && targetID && (
                <>
                    <Text> You are transferring {amount} to {targetUser} </Text>
                </>
            )}
            <Button title="Transfer" onPress={handleTransfer} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default TransactionScreen;