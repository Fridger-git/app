import React, { createContext, useState } from "react";

export const BarcodeScannerContext = createContext();

export const BarcodeScannerProvider = ({ children }) => {
  const [scannedBarcode, setScannedBarcode] = useState(null);

  return (
    <BarcodeScannerContext.Provider
      value={{ scannedBarcode, setScannedBarcode }}
    >
      {children}
    </BarcodeScannerContext.Provider>
  );
};

export default BarcodeScannerProvider;
