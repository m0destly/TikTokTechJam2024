// import React, { createContext, useContext, useState } from 'react';

// // Create a provider component
// export const AppProvider = ({ children }: any) => {
//   const [phone, setPhone] = useState('');
//   const [token, setToken] = useState('');

//   return (
//     <AppContext.Provider value={{ phone, setPhone, token, setToken }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useAppContext = () => useContext(AppContext);

import React, { createContext, useContext, useState } from 'react';

// Define the type of the context value
type MyContextType = {
  phone: string;
  setPhone: (value: string) => void;
  token: string;
  setToken: (value: string) => void;
}

// Create a context object
const AppContext = createContext<MyContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: any) => {
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');

  const contextValue: MyContextType = {
    phone,
    setPhone,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};