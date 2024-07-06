// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { useAppContext } from '../global/AppContext';
// import Scanner from '../components/QRCodeScanner';

// export default function HomeScreen({ navigator } :any) {

//   const { token } = useAppContext();
//   const [isCameraOn, setIsCameraOn] = useState(false);

//   const onLogOut = () => {
//     console.log("Logged Out")
//   }

//   const logToken = () => {
//     console.log(token);
//   }

//   const openScanner = () => {
//     setIsCameraOn(!isCameraOn);
//   }

//   return (
//     <View>
//       <View style={styles.container}>
//         <Text>Home Screen</Text>
//       </View>
//       <View>
//         <Button
//           onPress={logToken}
//           title="Token"
//         />
//       </View>
//       <View>
//         <Button
//           onPress={openScanner}
//           title="Scan to Pay"
//         />
//       </View>
//       {isCameraOn && <Scanner/>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     fontSize: 200,}
// });
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { useAppContext } from '../global/AppContext';
import Scanner from '../components/QRCodeScanner';

export default function HomeScreen({ navigator }: any) {
  const { token } = useAppContext();
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const onLogOut = () => {
    console.log("Logged Out");
  };

  const logToken = () => {
    console.log(token);
  };

  const openScanner = () => {
    setIsCameraVisible(true);
  };

  const closeScanner = () => {
    setIsCameraVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={logToken}
          title="Show Token"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={openScanner}
          title={isCameraVisible ? "Close Scanner" : "Scan to Pay"}
        />
      </View>

      {isCameraVisible && (
        <View style={styles.cameraContainer}>
          <Scanner style={styles.scanner} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  cameraContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: darken background
    zIndex: 1000, // Ensure it's above other elements
    elevation: 10,
  },
  scanner: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
    zIndex: 1100, // Ensure it's above the scanner
    elevation: 11,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
});
