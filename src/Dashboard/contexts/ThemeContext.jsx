import { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem } from "../Services/localStorage";

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    const [lightTheme, setLightTheme] = useState(() => getItem("theme"));
 
    const updateTheme = () => {
        setLightTheme(prev => !prev);
    };

    useEffect(() => {
        setItem("theme", lightTheme);
    }, [lightTheme]);

    return (
        <ThemeContext.Provider value={{ lightTheme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
export { ThemeProvider, useTheme };
