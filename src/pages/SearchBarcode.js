import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { BarcodeScannerContext } from "../components/BarcodeScannerContext";

const SearchBarcode = () => {
  const { scannedBarcode, setScannedBarcode } = useContext(
    BarcodeScannerContext
  );
  const [barcode, setBarcode] = useState(scannedBarcode || "");
  const [searchResults, setSearchResults] = useState([]);
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    if (scannedBarcode) {
      setBarcode(scannedBarcode); // Установка значения штрихкода из контекста
      setScannedBarcode(null); // Сброс значения штрихкода в контексте
      handleSearch();
    }
  }, [scannedBarcode]);

  const handleSearch = () => {
    const API_URL = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    axios
      .get(API_URL)
      .then((response) => {
        const productData = response.data;
        const productImageUrl = productData?.product?.image_url;

        setProductImage(productImageUrl);
        setSearchResults([productData]);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setSearchResults([]);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.forAnd}>
        <Text style={{ color: "yellow" }}>Поиск по номеру штрихкода</Text>
        <View>
          <TextInput
            style={{ marginTop: 30, marginBottom: 30 }}
            placeholder="Введите текст"
            value={barcode}
            onChangeText={setBarcode}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <Button title="Search" onPress={handleSearch} />
        </View>
        {productImage && (
          <Image
            source={{ uri: productImage }}
            style={{ width: 100, height: 100 }}
          />
        )}
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <Text key={item?.product?.code}>{item?.product?.product_name}</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forAnd: {
    top: Platform.OS === "android" ? 30 : 0,
    "&:first-child": {
      backgroundColor: "red",
    },
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
});

export default SearchBarcode;
