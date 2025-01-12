import { FaArrowTrendUp } from "react-icons/fa6";
import NavBar from "../components/Nav.jsx";
import HeroSection from "../components/Hero.jsx";
function Header() {
    return (
        <header
            className="flex flex-col justify-between items-center
            bg-color-1"
        >
            <NavBar />
            <HeroSection />
        </header>
    );
}

export default Header;
