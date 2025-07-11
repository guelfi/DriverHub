import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  colors: {
    background: '#f5f5f5',
    text: '#333',
    inputBackground: '#fff',
    inputBorder: '#ddd',
    buttonPrimary: '#007bff',
    buttonText: '#fff',
    linkText: '#007bff',
  },
};

const darkTheme = {
  colors: {
    background: '#333333',
    text: '#f5f5f5',
    inputBackground: '#555555',
    inputBorder: '#777',
    buttonPrimary: '#66b3ff',
    buttonText: '#333',
    linkText: '#66b3ff',
  },
};