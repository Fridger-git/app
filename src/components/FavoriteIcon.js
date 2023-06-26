import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const FavoriteIcon = ({ isFavorite, onPress }) => {
  const iconImage = isFavorite
    ? require("../../assets/favicon.png")
    : require("");

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={iconImage} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FavoriteIcon;
