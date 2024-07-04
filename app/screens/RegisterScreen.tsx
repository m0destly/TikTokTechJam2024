import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { register } from '../services/authService';
import { auth } from '@/FirebaseConfig';

const RegisterScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[message, setMessage] = useState('');

    // const handleRegister = async () => {
    //     try {
    //         await register(username, password);
    //         setMessage('User registered. You can now log in.');
    //         Alert.alert('successful registration');
    //         navigation.navigate('Login');
    //     } catch (error: any) {
    //         setMessage('Registration failed.' + error.message)
    //     }
    // }
    const handleRegister = async () => {
      auth.createUserWithEmailAndPassword(username, password)
        .then((userCredential) => {
          Alert.alert("Success", "You have created a new account");
          navigation.navigate('Login');
        })
        .catch((error) => {
          Alert.alert("Error", "Unable to create an account");
        })
    }

    return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Register" onPress={handleRegister} />
          {message && <Text>{message}</Text>}
        </View>
      );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      padding: 16 
    },
    input: { 
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
      marginBottom: 12, 
      paddingLeft: 8 
    },
  });

export default RegisterScreen;