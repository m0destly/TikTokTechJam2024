import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import api from '../components/api';
import { useAppContext } from '../global/AppContext';

const RegisterScreen = ({ navigation }: any) => {
    const { phone } = useAppContext();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const registerUser = async () => {
      try {
          const response = await api.post('/register', {
              user,
              password,
              name,
              phone,
          });
          console.log(response.data);
          navigation.navigate('Login');
      } catch (error) {
          console.error('Registration error:', error);
          Alert.alert("Error!", "Please try again later");
      }
  };

    return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Full Name'
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={user}
            onChangeText={setUser}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            value={phone}
            editable={false}
          />
          <Button title="Register" onPress={registerUser} />
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