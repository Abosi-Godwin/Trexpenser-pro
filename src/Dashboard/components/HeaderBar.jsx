import { FaBars, FaXmark, FaSun, FaMoon } from "react-icons/fa6";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Logo } from "../ui/Logo";
import NavBar from "../ui/Nav";

const HeaderBar = () => {
    const { lightTheme, updateTheme } = useTheme();

    const [showNav, setShowNav] = useState(false);

    const navHandler = () => setShowNav(prev => !prev);

    const getPage = useLocation();
    const currentPage = getPage.pathname.split("/").pop();

    return (
        <header
            className="bg-light-sidebarHeaderBackground p-2 grid grid-cols-1 gap-2 shadow-s shadow-light-dividers dark:shadow-dark-dividers dark:bg-dark-sidebarHeaderBackground dark:text-dark-text fixed md:static
        w-screen z-10"
        >
            <div className="flex justify-between items-center">
                <Logo />
                <div className="flex gap-5 items-center justify-end">
                    <h1
                        className="text-2xl p-2 rounded inline-block"
                        onClick={updateTheme}
                    >
                        {lightTheme ? <FaMoon /> : <FaSun />}
                    </h1>

                    <h1
                        className="text-2xl p-2 rounded
                inline-block md:hidden"
                        onClick={navHandler}
                    >
                        {showNav ? <FaXmark /> : <FaBars />}
                    </h1>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {showNav && <NavBar isMenuOpen={showNav} closeNavBar={navHandler}/>}
            </AnimatePresence>

            <div className="hidden w-full justify-between items-center p-2 md:flex border-t-2 border-t-light-cardBackground dark:border-t-dark-cardBackground">
                <p className="text-sm">Welcome to your {currentPage} page.</p>

                {currentPage === "dashboard" && (
                    <button
                        className="bg-light-primaryCTA text-white font-bold
                 rounded-md p-2 outline-0 ring-1 ring-light-secondaryAccent hover:bg-light-secondaryAccent"
                    >
                        Download Report
                    </button>
                )}
            </div>
        </header>
    );
};

export default HeaderBar;
