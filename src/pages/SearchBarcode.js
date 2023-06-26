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

const SearchBarcode = ({ navigation }) => {
  const { scannedBarcode } = useContext(BarcodeScannerContext);
  const [barcode, setBarcode] = useState(scannedBarcode || "");
  const [productName, setProductName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [selectedProductCode, setSelectedProductCode] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

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
        setSearchResults([product]);
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
      setSearchResults(products);
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

  const handleResultSelection = (selectedProductName, selectedProductCode) => {
    setProductName(selectedProductName);
    setSelectedProductCode(selectedProductCode);
    handleSearch();
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

      <View style={styles.resultContainer}>
        {productImage && (
          <Image source={{ uri: productImage }} style={styles.productImage} />
        )}

        {selectedProductCode ? (
          <Text style={styles.productCode}>{selectedProductCode}</Text>
        ) : null}

        {searchResults.length > 0 ? (
          // <FlatList
          //   data={searchResults}
          //   renderItem={({ item }) => (
          //     <TouchableOpacity
          //       onPress={() =>
          //         handleResultSelection(item.product_name, item.code)
          //       }
          //     >
          //       <Text key={item.code}>{item.product_name}</Text>
          //     </TouchableOpacity>
          //   )}
          // />
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text>{item.product_name}</Text>
                <FavoriteIcon
                  isFavorite={isFavorite}
                  onPress={() => setIsFavorite(!isFavorite)}
                />
              </View>
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
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default SearchBarcode;
