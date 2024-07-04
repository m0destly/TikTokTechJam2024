import React, { createContext, useContext, useState } from 'react';

// Create a context object
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0); // Example state

  return (
    <AppContext.Provider value={{ count, setCount }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);