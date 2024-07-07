import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet, Button, Linking, Text } from "react-native";
import { Camera, CameraView } from "expo-camera";

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const response = await Camera.requestCameraPermissionsAsync();
      setHasPermission(response.granted);
      console.log(response.granted);
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Example: Navigate to the scanned URL
    Linking.openURL(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        onMountError={() => {
          Alert.alert("Error", "There is an error starting up the camera");
          console.log("There is an error mounting the camera")
        }}
        style={{ height: 600, paddingTop: 150 }}
      />
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});

export default QRCodeScanner;