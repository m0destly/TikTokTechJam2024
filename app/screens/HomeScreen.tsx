import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Button, Icon } from 'react-native-elements';
import { useAppContext } from '../global/AppContext';
import api from '../components/api';
import QRCodeScanner from '../components/QRCodeScanner';
import RecentTransactions from '../components/RecentTransactions';

export default function HomeScreen({ navigation } :any) {
  const { token, setToken, setUserID, userName, setUserName } = useAppContext();
  const [balance, setBalance] = useState('');
  const [debt, setDebt] = useState('');
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );

  const getUserInfo = async () => {
    try {
      const response = await api.get('/me', {
        headers: {
          'x-access-token': token
        }
      });
      setUserName(response.data.name);
      setBalance(response.data.balance);
      setDebt(response.data.amountOwed);
      setUserID(response.data.id);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  const sendMoney = () => {
    navigation.navigate('Transaction');
  }

  const onLogOut = () => {
    setToken('');
    console.log("User has logged out");
  }

  const toLoan = () => {
    navigation.navigate("Loan");
  }

  const openScanner = () => {
    setIsCameraVisible(true);
  }

  const closeScanner = () => {
    setIsCameraVisible(false);
  }

  return (
    
    <View style={styles.container}>
      <View style={styles.logoutHeader}>
        <TouchableOpacity onPress={onLogOut} style={styles.logoutButton}>
          <Icon name="logout" type="material" size={24} color="black"/>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome back, {userName}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Current Balance</Text>
          <Text style={styles.balanceValue}>${balance}</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Amount Owed/Loans Debt</Text>
          <Text style={styles.balanceValue}>${debt}</Text>
        </View>
        <Text style={styles.transactionTitle}>Recent Transactions</Text>
        <View style={styles.transactionContainer}>
          <RecentTransactions/>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={sendMoney}
            title="Send"
            buttonStyle={styles.button}
            icon={<Icon name="north-east" type="material" size={20} color="white" />}
          />
          <Button
            onPress={openScanner}
            title="Scan"
            buttonStyle={styles.button}
            icon={<Icon name="qr-code-scanner" type="material" size={20} color="white" />}
          />
          <Button
            onPress={toLoan}
            title="Loan"
            buttonStyle={styles.button}
            icon={<Icon name="description" type="material" color="white" />}
          />
        </View>
      </View>
      {isCameraVisible && (
      <View style={styles.cameraContainer}>
        <QRCodeScanner/>
        <Pressable style={styles.closeButton} onPress={closeScanner}>
          <Text style={styles.closeButtonText}>X</Text>
        </Pressable>
      </View>
    )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  header: {
    backgroundColor: '#ff0050',
    padding: 15,
  },
  logoutHeader: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoutButton: {
    position: 'relative',
    left: 0,
  },
  title: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 20,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  balanceContainer: {
    padding: 15,
    backgroundColor: '#00f2ea',
  },
  balanceText: {
    fontSize: 25,
    fontWeight: '600',
    paddingBottom: 30,
  },
  balanceValue: {
    color: 'white',
    fontSize: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#007AFF',
  },
  cameraContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1000, 
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
    zIndex: 1100,
    elevation: 11,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
  transactionTitle: {
    padding: 15,
    fontSize: 25,
    fontWeight: '600',
  },
  transactionContainer: {
    maxHeight: 100,
  },
});