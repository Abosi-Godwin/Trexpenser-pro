import { useState, useMemo } from "react";
import { FaBars, FaXmark, FaSun, FaMoon } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { useTheme } from "../contexts/themeContext";
import { dropdownVariants } from "../Services/NavAnimationVariant";

const NavHome = () => {
    const [showNav, setShowNav] = useState(false);

    const { lightTheme, updateTheme } = useTheme;

    const navHandler = () => setShowNav(prev => !prev);

    const menuItems = useMemo(
        () => [
            { name: "Home", to: "/" },
            { name: "Features", to: "#features" },
            { name: "Benefits", to: "#benefits" },
            { name: "Reviews", to: "#reviews" }
        ],
        []
    );
    return (
        <nav
            className="flex justify-between w-full fixed top-0 shadow-md
        shadow-light-background z-50 p-4 bg-light-navbarFooter"
        >
            <div
                className="text-2xl font-bold uppercase flex
                items-center justify-centerd md:text-md"
            >
                <Link to="/">Trexpenser.</Link>
            </div>
            <AnimatePresence>
                {showNav && (
                    <motion.ul
                        key="menu"
                        variants={dropdownVariants}
                        initial="hidden"
                        exit="hidden"
                        animate="visible"
                        className="absolute top-0 left-0 z-10 p-8 w-2/3 rounded-br-md inline-flex flex-col flex-1 gap-20 px-3 justify-center origin-top-left bg-light-navbarFooter md:hidden"
                    >
                        {menuItems.map(item => (
                            <HashLink smooth to={item.to} key={item.name}>
                                <li
                                    className="font-bold w-full p-2 rounded-md
                                bg-light-sectionBackground
                                hover:bg-light-secondaryAccent
                                hover:text-white"
                                >
                                    {item.name}
                                </li>
                            </HashLink>
                        ))}
                        <li
                            className={`p-1.5 rounded-md 
                font-bold ${
                    lightTheme
                        ? "bg-light-primaryCTA text-light-text"
                        : "bg-color-2 text-color-8"
                }`}
                        >
                            <Link to="/signip">Join Now</Link>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>

            <ul
                className="hidden
                    flex-row p-5 gap-10 items-center justify-center
                    bg-light-navbarFooter md:flex"
            >
                {menuItems.map(item => (
                    <HashLink smooth to={item.to} key={item.to}>
                        <li
                            className="hover:text-gray-400
                    hover:font-bold "
                        >
                            {item.name}
                        </li>
                    </HashLink>
                ))}
                <li
                    className={`p-1.5 rounded-md 
                font-bold ${
                    lightTheme
                        ? "bg-light-primaryCTA text-light-text"
                        : "bg-color-2 text-color-8"
                }`}
                >
                    <Link to="/signip">Join Now</Link>
                </li>
            </ul>

            <div className="flex gap-5">
                <h1
                    className="text-2xl p-2 rounded flex
                items-center justify-center"
                    onClick={updateTheme}
                >
                    {lightTheme ? <FaSun /> : <FaMoon />}
                </h1>

                <h1
                    className="text-2xl p-2 rounded-md text-center flex
                    items-center justify-center bg-light-background none md:hidden"
                    onClick={navHandler}
                >
                    {showNav ? <FaXmark /> : <FaBars />}
                </h1>
            </div>
        </nav>
    );
};

export default NavHome;
 