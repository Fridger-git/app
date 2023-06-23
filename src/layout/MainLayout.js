import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  DrawerLayoutAndroid,
} from "react-native";
import { Icon, Button, SearchBar } from "@rneui/themed";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    flexDirection: "row",
  },
  btns: {
    flex: 1,
  },
});

const MainLayout = ({ children }) => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const NavMenu = (
    <View style={styles.container}>
      <View style={styles.btns}>
        <Button type="Clear">
          <Icon name="save" color="green" />
        </Button>
      </View>
      <View style={styles.btns}>
        <Button type="Clear">
          <Icon name="shopping-basket" color="green" />
        </Button>
      </View>
      <View style={styles.btns}>
        <Button type="Clear">
          <Icon name="fastfood" color="green" />
        </Button>
      </View>
      <View style={styles.btns}>
        <Button type="Clear">
          <Icon name="home" color="green" />
        </Button>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.btns}>
      {children}
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {NavMenu}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default MainLayout;
