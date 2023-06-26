import React from "react";
import MainLayout from "./src/layout/MainLayout";
import HomePage from "./src/pages/HomePage";
import SearchBarcode from "./src/pages/SearchBarcode";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BarcodeScannerPage from "./src/pages/BarcodeScannerPage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BarcodeScanner" component={BarcodeScannerPage} />
        <Stack.Screen name="SearchBarcode" component={SearchBarcode} />
        {/* Другие экраны */}
        {/* <MainLayout> */}
        {/* <HomePage /> */}
        {/* <SearchBarcode /> */}
        {/* <BarcodeScannerPage /> */}
        {/* </MainLayout> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
