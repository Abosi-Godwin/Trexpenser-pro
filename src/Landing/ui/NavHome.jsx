import { FaBars, FaXmark, FaSun, FaMoon } from "react-icons/fa6";
import { useState } from "react";

import { useTheme } from "../../Dashboard/contexts/ThemeContext";
import { Link } from "react-router-dom";
const NavHome = () => {
    const { updateTheme, lightTheme } = useTheme();
    const [showNav, setShowNav] = useState(false);

    const navHandler = () => {
        setShowNav(prev => !prev);
    };
    return (
        <div
            className="w-full p-5 flex justify-between shadow-md
             fixed z-50 top-0 left-0
            md:flex-row overflow-hidden"
        >
            <div
                className="text-2xl font-bold uppercase flex
                items-center justify-centerd md:text-md"
            >
                <Link to="/">Trexpenser.</Link>
            </div>
            <ul
                className="absolute left-[-100%] md:static md:flex gap-8 items-center justify-center
                md:flex-row"
            >
                <li>
                    <Link>Home</Link>
                </li>
                <li>
                    <Link>Features</Link>
                </li>
                <li>
                    <Link>Benefits</Link>
                </li>
                <li>
                    <Link>Reviews</Link>
                </li>
                <li
                    className={` p-1.5 rounded-md 
                font-bold ${
                    lightTheme
                        ? "bg-color-8 text-color-1"
                        : "bg-color-2 text-color-8"
                }`}
                >
                    <Link to="/signip">Join Now</Link>
                </li>
            </ul>
            <div className="flex gap-5">
                <h1
                    className="text-2xl bg-color-2 p-2 text-color-8 rounded flex
                items-center justify-center"
                    onClick={updateTheme}
                >
                    {lightTheme ? <FaSun /> : <FaMoon />}
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
export default NavHome;
