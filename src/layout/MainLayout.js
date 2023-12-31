import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Icon, Button } from "@rneui/themed";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    flexDirection: "row",
  },
  btns: {
    flex: 1,
    backgroundColor: "#2d2d30",
    // backgroundColor: "#000000",
    textColor: "#ffffff",
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
          <Icon name="save" color="#7CA982" />
        </Button>
      </View>
      <View style={styles.btns}>
        <Button type="Clear">
          <Icon name="shopping-basket" color="#7CA982" />
        </Button>
      </View>
      <View style={styles.btns}>
        <Button type="Clear">
          <Icon name="fastfood" color="#7CA982" />
        </Button>
      </View>
      <View style={styles.btns}>
        <Button type="Clear">
          <Icon name="home" color="#7CA982" />
        </Button>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.btns}>
      {children}
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        {NavMenu}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default MainLayout;
