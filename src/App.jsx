//Modules
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";


//Pages
import HomePage from "./Landing/HomePage";
import LoginPage from "./Dashboard/features/authentication/LoginPage";
import SignupPage from "./Dashboard/features/authentication/SignupPage";
import SubscriptionPage from "./Dashboard/features/ai/Subscription";

//Components
import ProtectedRoutes from "./Dashboard/features/authentication/ProtectedRoutes";
import AuthRedirect from "./Dashboard/features/authentication/AuthRedirect";
import DashboardLayout from "./Dashboard/ui/DashboardLayout";

//Dashboard pages
import DashboardHome from "./Dashboard/DashboardHome";
import Transactions from "./Dashboard/pages/Transactions";
import Savings from "./Dashboard/pages/SavingsPage";
import Budgets from "./Dashboard/pages/BudgetPage";
import Summary from "./Dashboard/pages/Summary";
import Profile from "./Dashboard/pages/Profile";

//Provideers
import { AuthProvider } from "./Dashboard/contexts/AuthContext";
import { ThemeProvider } from "./Dashboard/contexts/ThemeContext";

import { loader as imgLoader } from "./Landing/Services/ImgLoader";
import { queryClient } from "./Dashboard/Services/queryClient";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        loader: imgLoader
    },
    {
        path: "/signup",
        element: (
            <AuthRedirect>
                <SignupPage />
            </AuthRedirect>
        )
    },
    {
        path: "/login",
        element: (
            <AuthRedirect>
                <LoginPage />
            </AuthRedirect>
        )
    },

    {
        path: "subscribe",
        element: <SubscriptionPage />
    },
    {
        path: "*",
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoutes>
              
                    <DashboardLayout />
                
            </ProtectedRoutes>
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
            },
            {
                path: "/dashboard/summary",
                element: <Summary />
            },
            {
                path: "/dashboard/profile",
                element: <Profile />
            },
            {
                path: "/dashboard/profile",
                element: <Profile />
            }
        ]
    }
]);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
                <ReactQueryDevtools />
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
