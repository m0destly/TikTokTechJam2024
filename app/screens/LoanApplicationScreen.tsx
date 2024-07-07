import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import api from '../components/api';
import { useAppContext } from '../global/AppContext';
import { Platform } from 'react-native';

export default function LoanApplicationScreen({ navigation }: any) {
  const INTEREST_RATE = 0.02;
  const MAX_DEBT = 500;
  const { token, setUserID, userName, setUserName } = useAppContext();
  const [balance, setBalance] = useState('');
  const [debt, setDebt] = useState(0);
  const [loanAmount, setLoanAmount] = useState('');
  const [repaymentTerm, setRepaymentTerm] = useState(3);

  const terms = [3, 6, 12];

  const getUserInfo = async () => {
    try {
      const response = await api.get('/me', {
        headers: {
          'x-access-token': token
        }
      });
      setUserName(response.data.name);
      setBalance(response.data.balance);
      setDebt(parseFloat(response.data.amountOwed));
      setUserID(response.data.id);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const calculateInterest = () => {
    const months = repaymentTerm;
    const monthlyInterestRate = INTEREST_RATE / 12;
    const interestFactor = Math.pow(1 + monthlyInterestRate, months);
    return parseFloat(loanAmount || 0) * (interestFactor - 1);
  };

  const calculateFinalAmount = () => {
    const initialAmount = parseFloat(loanAmount || 0);
    const interestAmount = calculateInterest();
    return initialAmount + interestAmount;
  };

  const submitLoan = async () => {
    const initialAmount = parseFloat(loanAmount);
    const interestAmount = calculateInterest();
    const finalAmount = initialAmount + interestAmount;

    if (debt + finalAmount > MAX_DEBT) {
      Alert.alert('Loan Application Failed', 'The total debt exceeds the allowable limit of $500.');
      return;
    }

    const loanData = {
      name: userName,
      interest_amount: interestAmount,
      initialAmount: initialAmount,
      finalAmount: finalAmount
    };

    try {
      await api.post('/loans', loanData, {
        headers: {
          'x-access-token': token
        }
      });
      setDebt(debt + finalAmount);
      Alert.alert('Loan Application Submitted', 'Your loan application has been submitted successfully.');
    } catch (error) {
      console.error('Failed to submit loan application:', error);
      Alert.alert('Loan Application Failed', 'Failed to submit your loan application. Please try again later.');
    }
  };

  const getProgressBarColor = (value) => {
    if (value > 0.75) return '#FF0000'; // Red
    if (value > 0.5) return '#FFA500'; // Orange
    return '#008000'; // Green
  };

  const renderProgressBar = () => {
    const progress = (debt + calculateFinalAmount()) / MAX_DEBT;
    const color = getProgressBarColor(progress);
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
    );
  };

  const isSubmitDisabled = () => {
    return (debt + calculateFinalAmount()) > MAX_DEBT || parseFloat(loanAmount || 0) <= 0;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Loan Application</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Current Balance</Text>
        <Text style={styles.value}>${balance}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Current Debt</Text>
        <Text style={styles.value}>${debt}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="money" type="font-awesome" color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Enter Loan Amount"
          keyboardType="numeric"
          value={loanAmount}
          onChangeText={(text) => setLoanAmount(text)}
        />
      </View>
      
      <View style={styles.pickerContainer}>
        <Icon name="calendar" type="font-awesome" color="#777" />
        <Picker
          selectedValue={repaymentTerm}
          onValueChange={(itemValue: number) => setRepaymentTerm(itemValue)}
          style={styles.picker}
          
        >
          {terms.map((term) => (
            <Picker.Item key={term} label={`${term} months`} value={term} />
          ))}
        </Picker>
      </View>
      
      <Text style={styles.debtLabel}>
        Total Debt After Loan: ${(debt + calculateFinalAmount()).toFixed(2)}
      </Text>
      
      {renderProgressBar()}
      
      <Button
        onPress={submitLoan}
        title="Submit Loan Application"
        buttonStyle={styles.button}
        icon={<Icon name="check" type="font-awesome" size={20} color="white" />}
        disabled={isSubmitDisabled()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    flex: 1,
    ...Platform.select({
      ios: {
        height: 200,
        justifyContent: 'center',
      },
      android: {
        height: 50,
      }
    }),
  },
  debtLabel: {
    width: '100%',
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
});