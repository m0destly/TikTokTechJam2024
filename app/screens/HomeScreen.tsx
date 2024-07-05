import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppContext } from '../global/AppContext';

export default function HomeScreen({ navigator } :any) {

  const { token } = useAppContext();

  const onLogOut = () => {
    console.log("Logged Out")
  }

  const logToken = () => {
    console.log(token);
  }

  return (
    <View>
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
      <View>
        <Button
          onPress={logToken}
          title="Token"
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


