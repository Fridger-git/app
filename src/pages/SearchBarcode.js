import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { BarcodeScannerContext } from "../components/BarcodeScannerContext";
import FavoriteIcon from "../components/FavoriteIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchBarcode = ({ navigation }) => {
  const { scannedBarcode } = useContext(BarcodeScannerContext);
  const [barcode, setBarcode] = useState(scannedBarcode || "");
  const [productName, setProductName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [selectedProductCode, setSelectedProductCode] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setBarcode(scannedBarcode || "");
  }, [scannedBarcode]);

  const handleBarcodeChange = (text) => {
    setBarcode(text.trim());
  };

  const handleProductNameChange = (text) => {
    setProductName(text);
    setBarcode("");
  };

  const handleSearchByBarcode = async () => {
    try {
      if (!barcode) {
        setSearchResults([]);
        setProductImage(null);
        setProductName("");
        setSelectedProductCode("");
        return;
      }

      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const { product } = response.data;

      if (product) {
        const updatedSearchResults = [product].map((item) => ({
          ...item,
          isFavorite: false,
        }));
        setSearchResults(updatedSearchResults);
        setProductImage(product?.image_url);
        setProductName(product?.product_name);
        setSelectedProductCode(product?.code);
      } else {
        setSearchResults([]);
        setProductImage(null);
        setProductName("");
        setSelectedProductCode("");
      }
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setProductImage(null);
      setProductName("");
      setSelectedProductCode("");
    }
  };

  const handleSearchByProductName = async () => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&search_simple=1&action=process&json=1`
      );
      const { products } = response.data;
      const updatedSearchResults = products.map((item) => ({
        ...item,
        isFavorite: false,
      }));
      setSearchResults(updatedSearchResults);
      if (products.length > 0) {
        setProductImage(products[0]?.image_url);
        setBarcode("");
        setSelectedProductCode(products[0]?.code);
      } else {
        setProductImage(null);
        setSelectedProductCode("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    if (barcode) {
      await handleSearchByBarcode();
    } else if (productName) {
      await handleSearchByProductName();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [barcode]);

  const handleResultSelection = (selectedProduct) => {
    setProductName(selectedProduct.product_name);
    setSelectedProduct(selectedProduct);
    handleSearch();
  };

  const toggleFavorite = async (selectedProduct) => {
    try {
      if (selectedProduct && selectedProduct.code) {
        const isFavorite = favorites.some(
          (product) => product.code === selectedProduct.code
        );

        let updatedFavorites = [];
        if (isFavorite) {
          updatedFavorites = favorites.filter(
            (product) => product.code !== selectedProduct.code
          );
        } else {
          updatedFavorites = [...favorites, selectedProduct];
        }

        // Обновляем значение isFavorite у выбранного продукта
        const updatedSearchResults = searchResults.map((item) => ({
          ...item,
          isFavorite:
            item.code === selectedProduct.code ? !isFavorite : item.isFavorite,
        }));

        setSearchResults(updatedSearchResults);
        setFavorites(updatedFavorites);

        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите номер штрихкода"
        value={barcode}
        onChangeText={handleBarcodeChange}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <TextInput
        style={styles.input}
        placeholder="Введите название продукта"
        value={productName}
        onChangeText={handleProductNameChange}
        onSubmitEditing={handleSearch}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
        <Text>Перейти к избранным продуктам</Text>
      </TouchableOpacity>

      <View style={styles.resultContainer}>
        {productImage && (
          <Image source={{ uri: productImage }} style={styles.productImage} />
        )}

        {selectedProductCode ? (
          <Text style={styles.productCode}>{selectedProductCode}</Text>
        ) : null}

        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleResultSelection(item)}>
                <Text key={item.code}>{item.product_name}</Text>
                <FavoriteIcon
                  isFavorite={item.isFavorite}
                  onPress={() => toggleFavorite(item)}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>Ничего не найдено</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  resultContainer: {
    marginTop: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productCode: {
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default SearchBarcode;
