import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { login } from '../services/authService';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useAppContext } from '../global/AppContext';
import AuthOtp from '../screens/AuthOtp';
import PhoneAuth from '../components/PhoneAuth';
import axios from 'axios';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { testLogin, setLogin } = useAppContext();

  useEffect(() => {
    //axios.get('http://localhost:3000/users')
    axios.get('http://10.0.2.2:3000/users')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  
  const handleLogin = async () => {
    try {
      await login(username, password);
      Alert.alert("Successsful login!");
      console.log("Try Block: ");
      setLogin(true);
      
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
      setError('Login failed ' + error.message);
    }
  };

  const onPressRegister = () => {
    navigation.navigate('Register');
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
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={onPressRegister}
        >
        <View style={styles.outerText}>
            <Text style={styles.innerText2}>Click </Text>
            <Text style={styles.innerText1}>here </Text>
            <Text style={styles.innerText2}>to register</Text>
        </View>
      </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 16 },
  input: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 12, 
    paddingLeft: 8 },
  error: { 
    color: 'red', 
    marginBottom: 12 },
  outerText: {
    flexDirection: 'row',
  },
  innerText1: {
    color: 'blue',
    fontSize: 20,
  },
  innerText2: {
    fontSize: 20,
  },
});

export default LoginScreen;
