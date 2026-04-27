// Modules
import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

// Providers
import { AuthProvider } from "./Dashboard/contexts/AuthContext";
import { ThemeProvider } from "./Dashboard/contexts/ThemeContext";
import { queryClient } from "./Dashboard/services/queryClient";

// Layout & Guards
import ProtectedRoutes from "./Dashboard/features/authentication/ProtectedRoutes";
import AuthRedirect from "./Dashboard/features/authentication/AuthRedirect";
import DashboardLayout from "./Dashboard/ui/DashboardLayout";
import Loader from "./Dashboard/ui/Loader";
import AuthLayout from "./Dashboard/ui/AuthNav";

// Auth Pages
import LoginPage from "./Dashboard/features/authentication/LoginPage";
import SignupPage from "./Dashboard/features/authentication/SignupPage";
import AuthCallback from "./Dashboard/features/authentication/AuthCallback";
import VerifyEmail from "./Dashboard/features/authentication/VerifyEmail";
import ForgotPassword from "./Dashboard/features/authentication/forgotPassword";
import UpdatePassword from "./Dashboard/features/authentication/updatedPassword";
import SubscriptionPage from "./Dashboard/features/ai/Subscription";

// Dashboard Pages (lazy)
const DashboardHome = lazy(() => import("./Dashboard/DashboardHome"));
const Transactions = lazy(() => import("./Dashboard/pages/Transactions"));
const Savings = lazy(() => import("./Dashboard/pages/SavingsPage"));
const Budgets = lazy(() => import("./Dashboard/pages/BudgetPage"));
const Summary = lazy(() => import("./Dashboard/pages/Summary"));
const Profile = lazy(() => import("./Dashboard/pages/Profile"));

const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: (
                    <AuthRedirect>
                        <LoginPage />
                    </AuthRedirect>
                )
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
                path: "/forgot-password",
                element: (
                    <AuthRedirect>
                        <ForgotPassword />
                    </AuthRedirect>
                )
            },

            {
                path: "/auth/callback",
                element: <AuthCallback />
            },
            {
                path: "/auth/verify-email",
                element: (
                    <AuthRedirect>
                        <VerifyEmail />
                    </AuthRedirect>
                )
            },

            {
                path: "/change-password",
                element: (
                    <AuthRedirect>
                        <UpdatePassword />
                    </AuthRedirect>
                )
            }
        ]
    },

    {
        path: "/",
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
                path: "/transactions",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Transactions />
                    </Suspense>
                )
            },
            {
                path: "/savings",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Savings />
                    </Suspense>
                )
            },
            {
                path: "/budgets",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Budgets />
                    </Suspense>
                )
            },
            {
                path: "/summary",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Summary />
                    </Suspense>
                )
            },
            {
                path: "/profile",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Profile />
                    </Suspense>
                )
            },
            {
                path: "/subscribe",
                element: <SubscriptionPage />
            }
        ]
    },

    {
        path: "*",
        element: <Navigate to="/login" replace />
    }
]);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                    <Toaster position="top-right" />
                    <Analytics />
                    <ReactQueryDevtools />
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
