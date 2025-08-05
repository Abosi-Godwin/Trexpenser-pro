//Modules
import { lazy, Suspense } from "react";
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
import Loader from "./Dashboard/ui/Loader";
//Provideers
import { AuthProvider } from "./Dashboard/contexts/AuthContext";
import { ThemeProvider } from "./Dashboard/contexts/ThemeContext";

import { loader as imgLoader } from "./Landing/Services/ImgLoader";
import { queryClient } from "./Dashboard/Services/queryClient";

//Dashboard pages
const DashboardHome = lazy(() => import("./Dashboard/DashboardHome"));
const Transactions = lazy(() => import("./Dashboard/pages/Transactions"));
const Savings = lazy(() => import("./Dashboard/pages/SavingsPage"));
const Budgets = lazy(() => import("./Dashboard/pages/BudgetPage"));
const Summary = lazy(() => import("./Dashboard/pages/Summary"));
const Profile = lazy(() => import("./Dashboard/pages/Profile"));

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
                element: (
                    <Suspense fallback={<Loader />}>
                        <DashboardHome />
                    </Suspense>
                )
            },
            {
                path: "/dashboard/transactions",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Transactions />
                    </Suspense>
                )
            },
            {
                path: "/dashboard/savings",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Savings />
                    </Suspense>
                )
            },
            {
                path: "/dashboard/budgets",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Budgets />
                    </Suspense>
                )
            },
            {
                path: "/dashboard/summary",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Summary />
                    </Suspense>
                )
            },
            {
                path: "/dashboard/profile",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Profile />
                    </Suspense>
                )
            }
        ]
    }
]);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools />
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
