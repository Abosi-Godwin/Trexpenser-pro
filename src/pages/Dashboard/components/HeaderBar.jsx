import { FaBars, FaXmark, FaSun, FaMoon } from "react-icons/fa6";
import { useState } from "react";

import { useAuth } from "../../../contexts/AuthContext.jsx";
import { useTheme } from "../../../contexts/ThemeContext.jsx";
import { NavLink } from "react-router";

const HeaderBar = () => {
    const { isAuthenticated } = useAuth();
    const { updateTheme, lightTheme } = useTheme();

    const [showNav, setShowNav] = useState(false);

    const navHandler = () => {
        setShowNav(prev => !prev);
    };

    return (
        <header className="p-5 bg-color-2 col-start-2">
            <h1
                className="text-2xl bg-color-2 p-2 text-color-8 rounded inline-block"
                onClick={updateTheme}
            >
                {lightTheme ? <FaMoon /> : <FaSun />}
            </h1>

            <h1
                className="text-2xl bg-color-2 p-2 text-color-8 rounded
                inline-block md:hidden"
                onClick={navHandler}
            >
                {showNav ? <FaXmark /> : <FaBars />}
            </h1>
        </header>
    );
};

export default HeaderBar;
