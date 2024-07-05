import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthOtp from '../screens/AuthOtp';
import { AppProvider } from '../global/AppContext';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AppProvider>
      <AuthStack.Navigator>
        <AuthStack.Screen name="AuthOtp" component={AuthOtp} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
    </AppProvider>
  );
}

export default AuthNavigator;
