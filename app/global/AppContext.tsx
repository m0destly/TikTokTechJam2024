import React, { createContext, useContext, useState } from 'react';

// Create a context object
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }: any) => {
  const [testLogin, setLogin] = useState(false);
  console.log("From APP Context: " + testLogin);

  return (
    <AppContext.Provider value={{ testLogin, setLogin }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);