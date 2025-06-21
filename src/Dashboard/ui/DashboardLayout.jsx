import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import MainSection from "../components/MainComponent";
import { useTheme } from "../contexts/ThemeContext";

import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
    const { lightTheme } = useTheme();

    return (
        <main
            className={`md:grid grid-cols-1 md:grid-cols-[9rem_1fr]
            grid-rows-[auto_1fr] h-screen w-screen bg-light-mainBackground
            dark:bg-dark-mainBackground  ${!lightTheme && "dark"}`}
        >
            <SideBar />
            <HeaderBar />
            <MainSection>
                <Toaster />
                <Outlet />
            </MainSection>
        </main>
    );
};

export default DashboardLayout;
