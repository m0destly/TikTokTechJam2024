import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useAppContext } from '../global/AppContext';
import api from '../components/api';

const LoginScreen = ({ navigation }: any) => {
  const { phone, token, setToken } = useAppContext();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        user,
        password,
        phone,
      });
      setToken(response.data.token);
      console.log('Logged in successfully:', response.data);
    } catch (error: any) {
        setError(error.message);
        console.error('Login error:', error);
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