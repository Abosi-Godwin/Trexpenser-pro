// DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import MainSection from "../components/MainComponent";
import ScrollToTop from "../components/ScrollToTop";
import { useTheme } from "../contexts/ThemeContext";

const DashboardLayout = () => {
  const { lightTheme } = useTheme();

  return (
    <main
      className={`
        grid grid-cols-1 grid-rows-[auto_1fr]
        md:grid-cols-[9rem_1fr]
        min-h-screen
        ${!lightTheme ? "dark" : ""}
      `}
    >
      <SideBar />
      <HeaderBar />
      <MainSection>
        <Outlet />
      </MainSection>
      <ScrollToTop />
    </main>
  );
};

export default DashboardLayout;