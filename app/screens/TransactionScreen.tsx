import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { useAppContext } from '../global/AppContext';
import api from '../components/api';

const TransactionScreen = ({navigation} : any) => {
    const { userID, userName } = useAppContext();
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [targetUser, setTargetUser] = useState('');
    const [targetID, setTargetID] = useState('');
    const [amount, setAmount] = useState('');
    const [isPhone, setIsPhone] = useState(false);

    const changeMode = () => {
        setIsPhone(!isPhone);
        resetFields();
    }

    const resetFields = () => {
        setUsername('');
        setPhone('');
        setTargetUser('');
        setTargetID('');
        setAmount('');
    }

    const checkRecipientUser = async () => {
        try {
            if (!username) {
                setTargetUser('');
                setTargetID('');
                return;
            }

            const response = await api.get(`/getRecipientUser?user=${username}`);
            
            if (response.status === 200) {
                setTargetUser(response.data.name);
                setTargetID(response.data.id);
            } 
        } catch (error) {
            setTargetUser('User not found');
            setTargetID('');
            console.error(error);
        }
    };

    const checkRecipientPhone = async () => {
        try {
            if (!phone) {
                setTargetUser('');
                setTargetID('');
                return;
            }

            const response = await api.get(`/getRecipientPhone?phone=${encodeURIComponent(phone)}`);
            
            if (response.status === 200) {
                setTargetUser(response.data.name);
                setTargetID(response.data.id);
            }
        } catch (error) {
            setTargetUser('User not found');
            setTargetID('');
            console.error(error);
        }
    };

    const handleTransfer = async () => {
        if (!targetID|| !amount) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (userID === targetID) {
            Alert.alert('Error', 'You cannot make transactions to yourself');
            return;
        }

        try {
            const response = await api.post('/transfer', {
                fromUserId: parseInt(userID, 10),
                toUserId: parseInt(targetID, 10),
                amount: parseFloat(amount),
                fromUser: userName,
                toUser: targetUser,
            });
            resetFields();
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
                placeholder={isPhone ? "Phone Number" : "Username"}
                keyboardType={isPhone ? "phone-pad" : "default"}
                value={isPhone ? phone : username}
                onChangeText={isPhone ? setPhone : setUsername}
                onEndEditing={isPhone ? checkRecipientPhone : checkRecipientUser}
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
                    <Text> You are transferring ${amount} to {targetUser} </Text>
                </>
            )}
            <Button title={isPhone ? "By Username" : "By Phone"} onPress={changeMode}/>
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