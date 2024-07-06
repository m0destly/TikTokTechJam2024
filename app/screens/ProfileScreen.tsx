import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getProfile, logout } from '../services/authService';

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const profile = await getProfile();
      setUser(profile);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Welcome, {user.username}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
