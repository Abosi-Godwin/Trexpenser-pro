import { createContext, useContext, useState } from "react";
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
     const [lightTheme, setLightTheme] = useState(true);

    const updateTheme = () => {
          setLightTheme(prev => !prev);
    };
    return <ThemeContext.Provider value={{lightTheme, updateTheme}}>{children}</ThemeContext.Provider>;
};
export { ThemeProvider, useTheme };
