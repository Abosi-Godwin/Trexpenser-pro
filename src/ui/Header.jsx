
import { useTheme } from "../contexts/ThemeContext.jsx";
import NavHome from "./NavHome.jsx";
import HeroSection from "./Hero.jsx";
function Header() {
    const { lightTheme } = useTheme();
    return (
        <header
            className={`flex flex-col justify-between items-center
             ${lightTheme ? "bg-color-1" : "bg-color-8 text-color-1"}`}
        >
            <NavHome />
            <HeroSection />
        </header>
    );
}

export default Header;
