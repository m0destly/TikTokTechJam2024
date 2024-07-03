// PhoneAuth.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../../FirebaseConfig';
import firebase from 'firebase/compat';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [message, setMessage] = useState('');

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('Recaptcha resolved');
        },
        'expired-callback': () => {
          console.log('Recaptcha expired');
        }
      });
    }
  };

  const handleSendCode = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setMessage('Code sent');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await auth.signInWithCredential(credential);
      setMessage('Phone number verified!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <View id="recaptcha-container" />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <Button title="Send Code" onPress={handleSendCode} />
      {verificationId && (
        <>
          <TextInput
            placeholder="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
          />
          <Button title="Verify Code" onPress={handleVerifyCode} />
        </>
      )}
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default PhoneAuth;