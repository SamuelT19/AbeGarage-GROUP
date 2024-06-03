import React, { createContext, useState, useContext } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customerData, setCustomerData] = useState(null);

  const updateCustomerData = (data) => {
    setCustomerData(data);
  };

  return (
    <CustomerContext.Provider value={{ customerData, updateCustomerData }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);
