import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SubscriptionPage from "./pages/Subscription";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import DashboardLayout from "./pages/Dashboard/ui/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Transactions from "./pages/Dashboard/pages/Transactions";
import Savings from "./pages/Dashboard/pages/SavingsPage";
import Budgets from "./pages/Dashboard/pages/BudgetPage";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { TransactionsProvider } from "./contexts/TransactionsContext.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { loader as imgLoader } from "./Utils/ImgLoader";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        loader: imgLoader
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/dashboard",
        element: (
            <Provider store={store}>
                <ProtectedRoutes>
                    <TransactionsProvider>
                        <DashboardLayout />
                    </TransactionsProvider>
                </ProtectedRoutes>
            </Provider>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: "/dashboard/transactions",
                element: <Transactions />
            },
            {
                path: "/dashboard/savings",
                element: <Savings />
            },
            {
                path: "/dashboard/budgets",
                element: <Budgets />
            }
        ]
    },
    {
        path: "subscribe",
        element: <SubscriptionPage />
    },
    {
        path: "*",
        element: <Navigate to="/" replace />
    }
]);

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
