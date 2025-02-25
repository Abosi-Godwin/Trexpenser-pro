import { FaBars, FaXmark, FaSun, FaMoon } from "react-icons/fa6";
import { useState } from "react";

import { useAuth } from "../contexts/AuthContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { NavLink, Link } from "react-router";
const NavBar = () => {
    const { isAuthenticated } = useAuth();
    const { updateTheme, lightTheme } = useTheme();

    const [showNav, setShowNav] = useState(false);

    const navHandler = () => {
        setShowNav(prev => !prev);
    };

    return (
        <div
            className={`w-full p-5 flex justify-between gap-5 shadow-md
             fixed z-50 top-0 left-0 md:bottom-0 md:w-1/6
            md:flex-col md:max-h-screen overflow-hidden ${
                lightTheme
                    ? "bg-white shadow-color-2"
                    : "bg-color-9 text-color-1 shadow-color-7"
            }`}
        >
            <div
                className={`text-2xl font-bold uppercase flex
                items-center justify-centerd md:text-md ${
                    lightTheme ? "text-color-8" : "text-color-1 "
                }`}
            >
                <h1>Trexpenser.</h1>
            </div>
            <nav
                className={`nav_links fixed h-screen w-screen
            left-0 flex flex-col justify-center items-center z-0 gap-10 text-xl
            transition-all duration-500 md:w-fit md:static md:text-md
            md:bg-color-2 md:rounded-md md:text-color-8 md:px-4 ${
                showNav ? "top-20" : "-top-[110%]"
            }`}
            >
                <NavLink to="/dashboard">Home</NavLink>

                <NavLink to="/dashboard/savings" onClick={navHandler}>Savings</NavLink>

                <NavLink to="/dashboard/budgets">Budgets</NavLink>

                <NavLink to="/dashboard/transactions">Transactions</NavLink>
                
                <NavLink to="/dashboard/settings">Settings</NavLink>
            </nav>
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
        </div>
    );
};
export default NavBar;
