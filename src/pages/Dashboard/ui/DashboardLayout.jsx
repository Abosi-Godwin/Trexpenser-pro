import { Outlet } from "react-router";
import SideBar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";

const DashboardLayout = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[10rem_1fr] grid-rows-[auto_1fr] h-screen">
            <SideBar />
            <HeaderBar />
            <main className="col-start-2">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
