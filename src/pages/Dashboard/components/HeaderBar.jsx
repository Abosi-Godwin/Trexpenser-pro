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
        <header className="p-5 bg-amber-500 col-start-2">
            {" "}
            <div className="flex gap-5">
                <h1
                    className="text-2xl bg-color-2 p-2 text-color-8 rounded flex
                items-center justify-center"
                    onClick={updateTheme}
                >
                    {lightTheme ? <FaMoon /> : <FaSun />}
                </h1>

                <h1
                    className="text-2xl bg-color-2 p-2 text-color-8 rounded
                text-center flex items-center justify-center none md:hidden"
                    onClick={navHandler}
                >
                    {showNav ? <FaXmark /> : <FaBars />}
                </h1>
            </div>
        </header>
    );
};

export default HeaderBar;
