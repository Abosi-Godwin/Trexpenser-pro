
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
  const { pathname } = useLocation();

  const currentPage = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
  const isHome = currentPage === "dashboard" || pathname === "/";

  return (
    <header
      className="col-span-1 md:col-start-2
        bg-light-sidebarHeaderBackground 
        dark:bg-dark-sidebarHeaderBackground 
        dark:text-dark-text
        fixed md:static top-0 left-0 right-0
        w-full z-10
        p-2 flex flex-col gap-2
        shadow-sm shadow-light-dividers 
        dark:shadow-dark-dividers"
    >
      <div className="flex justify-between items-center">
        <Logo />

        <div className="flex gap-3 items-center">
          {/* Theme toggle */}
          <button
            onClick={updateTheme}
            aria-label={lightTheme ? "Switch to dark mode" : "Switch to light mode"}
            className="text-2xl p-2 rounded hover:bg-light-sectionBackground
              dark:hover:bg-dark-sectionBackground transition-colors"
          >
            {lightTheme ? <FaMoon /> : <FaSun />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setShowNav((prev) => !prev)}
            aria-label={showNav ? "Close menu" : "Open menu"}
            aria-expanded={showNav}
            className="text-2xl p-2 rounded md:hidden
              hover:bg-light-sectionBackground 
              dark:hover:bg-dark-sectionBackground transition-colors"
          >
            {showNav ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence mode="wait">
        {showNav && (
          <NavBar isMenuOpen={showNav} closeNavBar={() => setShowNav(false)} />
        )}
      </AnimatePresence>

      {/* Desktop breadcrumb bar */}
      <div className="hidden md:flex w-full justify-between items-center 
        p-2 border-t-2 border-t-light-cardBackground 
        dark:border-t-dark-cardBackground">
        <p className="text-sm capitalize">
          Welcome to your <strong>{currentPage}</strong> page.
        </p>

        {isHome && (
          <button
            className="bg-light-primaryCTA text-white font-bold
              rounded-md px-3 py-2 outline-0 ring-1 
              ring-light-secondaryAccent 
              hover:bg-light-secondaryAccent transition-colors"
          >
            Download Report
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderBar;