import { Text, View } from "react-native";
import 'react-native-gesture-handler'
import AppNavigator from "./navigation/AppNavigator";
import { AppProvider } from "./global/AppContext";

export default function Index() {
  return (
    <AppProvider>
      <AppNavigator/>
    </AppProvider>
  );
}
