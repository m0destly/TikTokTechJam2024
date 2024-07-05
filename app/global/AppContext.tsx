import React, { createContext, useContext, useState } from 'react';

// Create a context object
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }: any) => {
  const [testLogin, setLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  // console.log("From APP Context: " + testLogin);

  return (
    <AppContext.Provider value={{ testLogin, setLogin, phoneNumber, setPhoneNumber }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);