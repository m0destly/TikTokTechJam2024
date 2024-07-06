import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthNavigator from './AuthNavigator';
import { useAppContext } from '../global/AppContext';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  const { token } = useAppContext();

  return (
    <AppStack.Navigator>
      {true ? (
        <>
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <AppStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      )}
    </AppStack.Navigator>
  );
}

export default AppNavigator;