import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    // authentication logic
  };

  const toRegister = () => {
    //navigation.navigate('')
  }

  return (
    <ImageBackground 
      source={require('../assets/images/tiktokbg.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>KotKitPay</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#fff"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={toRegister}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 50,
    textAlign: 'center',
    color: '#fff', 
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#fff', 
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    color: '#fff', 
  },
});

export default LoginScreen;