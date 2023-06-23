import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Icon, Button, SearchBar } from "@rneui/themed";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forAnd: {
    top: Platform.OS === "android" ? 30 : 0,
  },
});

const HomePage = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <View style={styles.forAnd}>
        <SearchBar
          platform="ios"
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
        />
      </View>
    </View>
  );
};

export default HomePage;
