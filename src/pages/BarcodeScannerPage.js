import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BarcodeScannerContext } from "../components/BarcodeScannerContext";

const BarcodeScannerPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { setScannedBarcode } = useContext(BarcodeScannerContext);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedBarcode(data); // Сохранение значения штрихкода в контексте
    navigation.navigate("SearchBarcode"); // Переход на страницу "SearchBarcode"
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
