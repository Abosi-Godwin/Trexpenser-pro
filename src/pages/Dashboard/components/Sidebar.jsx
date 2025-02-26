import { useTheme } from "../../../contexts/ThemeContext.jsx";
import { NavLink } from "react-router";

const SideBar = () => {
    const { lightTheme } = useTheme();
    return (
        <aside
            className={`hidden row-span-full py-4 md:block  ${
                lightTheme
                    ? "bg-color-2 shadow-color-2"
                    : "bg-color-9 text-color-1 shadow-color-7"
            }`}
        >
            <div
                className={`w-full bg-color-2 text-xl font-bold uppercase flex
                items-center justify-center text-center   md:text-md ${
                    lightTheme ? "text-color-8" : "text-color-1 "
                }`}
            >
                <h1>Trexpenser.</h1>
            </div>
            <nav
                className="flex flex-col justify-center items-center gap-10
            py-14"
            >
                <NavLink to="/dashboard">Home</NavLink>

                <NavLink to="/dashboard/savings">Savings</NavLink>

                <NavLink to="/dashboard/budgets">Budgets</NavLink>

                <NavLink to="/dashboard/transactions">Transactions</NavLink>

                <NavLink to="/dashboard/settings">Settings</NavLink>
            </nav>
        </aside>
    );
};

export default SideBar;
