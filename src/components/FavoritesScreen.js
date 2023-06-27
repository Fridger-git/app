import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) =>
            item ? <Text>{item.product_name}</Text> : null
          }
          keyExtractor={(item) => (item ? item.code : "")}
        />
      ) : (
        <Text>Список избранных продуктов пуст</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
