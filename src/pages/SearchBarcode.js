import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { BarcodeScannerContext } from "../components/BarcodeScannerContext";

const SearchBarcode = ({ navigation }) => {
  const { scannedBarcode } = useContext(BarcodeScannerContext);
  const [barcode, setBarcode] = useState(scannedBarcode || "");
  const [productName, setProductName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    setBarcode(scannedBarcode || "");
  }, [scannedBarcode]);

  const handleBarcodeChange = (text) => {
    setBarcode(text.trim()); // Удаляем лишние пробелы и сохраняем значение
  };

  const handleProductNameChange = (text) => {
    setProductName(text);
  };

  const handleSearchByBarcode = async () => {
    try {
      if (!barcode) {
        // Если код пуст, очищаем результаты поиска и выходим из функции
        setSearchResults([]);
        setProductImage(null);
        setProductName("");
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
      } else {
        // Если свойство product отсутствует, очищаем результаты поиска
        setSearchResults([]);
        setProductImage(null);
        setProductName("");
      }
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setProductImage(null);
      setProductName("");
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
        setBarcode(products[0]?.code);
      } else {
        setProductImage(null);
        setBarcode("");
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
    handleSearch(); // Вызываем handleSearch при изменении значения barcode
  }, [barcode]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите номер штрихкода"
        value={barcode}
        onChangeText={handleBarcodeChange}
        onSubmitEditing={handleSearch}
        returnKeyType="search" // Добавлено для отображения кнопки "ввод" на клавиатуре
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
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <Text key={item.code}>{item.product_name}</Text>
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
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});

export default SearchBarcode;
