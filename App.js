import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import BarcodeScannerPage from "./src/pages/BarcodeScannerPage";
import SearchBarcode from "./src/pages/SearchBarcode";
import BarcodeScannerProvider from "./src/components/BarcodeScannerContext";
import HomePage from "./src/pages/HomePage";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <BarcodeScannerProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Scanner") {
                iconName = "camera";
              } else if (route.name === "SearchBarcode") {
                iconName = "search";
              }

              return <Icon name={iconName} color={color} />;
            },
            tabBarActiveTintColor: "#7CA982",
            tabBarInactiveTintColor: "gray",
          })}
        >
          {/* <Tab.Screen name="Home" component={HomePage} /> */}
          <Tab.Screen name="SearchBarcode" component={SearchBarcode} />
          <Tab.Screen name="Scanner" component={BarcodeScannerPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </BarcodeScannerProvider>
  );
};

export default App;
