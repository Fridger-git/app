import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BarcodeScannerPage from "./src/pages/BarcodeScannerPage";
import SearchBarcode from "./src/pages/SearchBarcode";
import BarcodeScannerProvider from "./src/components/BarcodeScannerContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <BarcodeScannerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BarcodeScanner" component={BarcodeScannerPage} />
          <Stack.Screen name="SearchBarcode" component={SearchBarcode} />
        </Stack.Navigator>
      </NavigationContainer>
    </BarcodeScannerProvider>
  );
};

export default App;
