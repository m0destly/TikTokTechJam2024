import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Button } from 'react-native';
import React, { useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '@/FirebaseConfig';
import firebase from 'firebase/compat';
import { useAppContext } from '../global/AppContext';

const AuthOtp = ({ navigation }: any) => {
  const {phone, setPhone} = useAppContext();
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [message, setMessage] = useState('');
    const [display, setDisplay] = useState(true);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            phoneProvider
                .verifyPhoneNumber(phone, recaptchaVerifier.current)
                .then(setVerificationId);
            setMessage('Code sent');
            setDisplay(false);
        } catch (error: any) {
            Alert.alert("Error!", error.message);
        }
    }

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
            .then(() => {
                setCode('');
                setMessage('Verified correct');
                Alert.alert("Verification success!");
                navigation.navigate("Login");
            })
            .catch((error) => {
                Alert.alert("Login failed: " + error.message);
            })
    }

    return (
        <View style={{ padding: 20 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
          <View id="recaptcha-container" />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete='tel'
            editable={display}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
          />
          <Button title="Send Verification SMS" onPress={sendVerification} />
          {verificationId && (
            <>
              <TextInput
                placeholder="Verification Code"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
              />
              <Button title="Verify Code" onPress={confirmCode} />
            </>
          )}
          {message ? <Text>{message}</Text> : null}
        </View>
      );
}

export default AuthOtp;