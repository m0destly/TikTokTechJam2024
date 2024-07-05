// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import axios from 'axios';
// import { useAppContext } from '../global/AppContext';

// const Link = () => {
//     const { phone } = useAppContext();
//     const [phone, setPhone] = useState(phoneNumber);
//     const [user, setUser] = useState('');
//     const [password, setPassword] = useState('');
//     const [token, setToken] = useState('');

//     const registerUser = async () => {
//         try {
//             const response = await axios.post('http://localhost:3000/register', {
//                 user,
//                 password,
//                 phone
//             });
//             console.log(response.data);
//         } catch (error) {
//             console.error('Registration error:', error);
//         }
//     };

//     const loginUser = async () => {
//         try {
//             const response = await axios.post('http://localhost:3000/login', {
//                 user,
//                 password,
//             });
//             setToken(response.data.token);
//             console.log('Logged in successfully:', response.data);
//         } catch (error) {
//             console.error('Login error:', error);
//         }
//     };

//     const getUserInfo = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/me', {
//                 headers: {
//                     'x-access-token': token
//                 }
//             });
//             console.log('User info:', response.data);
//         } catch (error) {
//             console.error('Failed to fetch user info:', error);
//         }
//     };

//     return (
//         <View>
//             <TextInput
//                 placeholder="Username"
//                 value={user}
//                 onChangeText={setUser}
//             />
//             <TextInput
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//             />
//             <TextInput
//                 placeholder="Phone"
//                 value={phone}
//                 onChangeText={setPhone}
//                 editable={false}
//             />
//             <Button title="Register" onPress={registerUser} />
//             <Button title="Login" onPress={loginUser} />
//             <Button title="Get User Info" onPress={getUserInfo} />
//         </View>
//     );
// };

// export default Link;