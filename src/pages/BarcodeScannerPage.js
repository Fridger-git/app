import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native"; // Используем useNavigation из react-navigation/native
import axios from "axios";

const BarcodeScannerPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productResult, setProductResult] = useState(null);

  const navigation = useNavigation(); // Используем useNavigation вместо useNavigate

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getProductData(data);
  };

  const getProductData = (barcode) => {
    const API_URL = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    axios
      .get(API_URL)
      .then((response) => {
        const productData = response.data;
        navigation.navigate("SearchBarcode", { productResult: productData }); // Передача данных о продукте при переходе на страницу "SearchBarcode"
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  };

  const handleContinue = () => {
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={handleBarCodeScanned}
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned successfully!</Text>
          <Button onPress={handleContinue} title="Continue Scanning" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default BarcodeScannerPage;
