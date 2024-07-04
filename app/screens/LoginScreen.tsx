import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { login } from '../services/authService';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useAppContext } from '../global/AppContext';
import PhoneAuth from '../components/PhoneAuth';
import AuthOtp from '../components/AuthOtp';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { testLogin, setLogin } = useAppContext();

  const handleLogin = async () => {
    try {
      await login(username, password);
      Alert.alert("Successsful login!");
      console.log("Try Block: ");
      //setLogin(true);
      
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
      {/* <TextInput
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

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={onPressRegister}
        >
        <View style={{flexDirection: 'row'}}>
            <Text>Click </Text>
            <Text>here </Text>
            <Text>to register</Text>
        </View>
      </TouchableHighlight>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
      <View>
        <PhoneAuth/>
      </View> */}
      <AuthOtp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
  error: { color: 'red', marginBottom: 12 },
});

export default LoginScreen;
