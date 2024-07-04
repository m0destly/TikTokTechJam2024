import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppContext } from '../global/AppContext';

export default function HomeScreen({ navigator} :any) {

  const { testLogin, setLogin } = useAppContext();

  const onLogOut = () => {
    setLogin(false);
    console.log("Logged Out")
  }

  return (
    <View>
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
      <View>
        <Button
          onPress={onLogOut}
          title="Log Out"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: 200,}
});


