import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";

const FavoriteIcon = ({ isFavorite, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={isFavorite ? "star" : "star-outline"} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
});

export default FavoriteIcon;
