import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoanApplicationScreen from '../screens/LoanApplicationScreen';
import TransactionScreen from '../screens/TransactionScreen';
import AuthNavigator from './AuthNavigator';
import { useAppContext } from '../global/AppContext';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  const { token } = useAppContext();

  return (
    <AppStack.Navigator>
      {token ? (
        <>
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Loan" component={LoanApplicationScreen} />
          <AppStack.Screen name="Transaction" component={TransactionScreen} />
        </>
      ) : (
        <AppStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      )}
    </AppStack.Navigator>
  );
}

export default AppNavigator;