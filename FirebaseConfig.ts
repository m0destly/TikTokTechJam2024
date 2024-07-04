import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBMpaVzuq8NI7bCTOepv4ET5Ia-UfHgHYY",
  authDomain: "tiktoktechjam-cd454.firebaseapp.com",
  projectId: "tiktoktechjam-cd454",
  storageBucket: "tiktoktechjam-cd454.appspot.com",
  messagingSenderId: "966160022918",
  appId: "1:966160022918:web:50980e2512c5ce148d8007",
  measurementId: "G-6GBD928G1N"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

export { auth };