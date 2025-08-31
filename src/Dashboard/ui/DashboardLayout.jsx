import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import MainSection from "../components/MainComponent";
import ScrollToTop from "../components/ScrollToTop";
import { useTheme } from "../contexts/ThemeContext";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
    const { lightTheme } = useTheme();

    return (
        <main
            className={`md:grid md:grid-cols-[9rem_1fr] grid-rows-[auto_1fr] ${
                !lightTheme && "dark"
            }`}
        >
            <SideBar />
            <HeaderBar />
            <MainSection>
                <Outlet />
            </MainSection>
            <ScrollToTop />
            <Toaster position="top-right" />
        </main>
    );
};

export default DashboardLayout;
