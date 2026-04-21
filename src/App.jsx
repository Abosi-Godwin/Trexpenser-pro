//Modules
import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";

//Pages
import LoginPage from "./Dashboard/features/authentication/LoginPage";
import SignupPage from "./Dashboard/features/authentication/SignupPage";
import AuthCallback from "./Dashboard/features/authentication/AuthCallback";
import VerifyEmail from "./Dashboard/features/authentication/VerifyEmail";
import ForgotPassword from "./Dashboard/features/authentication/forgotPassword";
import UpdatePassword from "./Dashboard/features/authentication/updatedPassword";
import SubscriptionPage from "./Dashboard/features/ai/Subscription";

//Components
import ProtectedRoutes from "./Dashboard/features/authentication/ProtectedRoutes";
import AuthRedirect from "./Dashboard/features/authentication/AuthRedirect";
import DashboardLayout from "./Dashboard/ui/DashboardLayout";
import Loader from "./Dashboard/ui/Loader";

//Provideers
import { AuthProvider } from "./Dashboard/contexts/AuthContext";
import { ThemeProvider } from "./Dashboard/contexts/ThemeContext";
import { queryClient } from "./Dashboard/services/queryClient";
import { Toaster } from "react-hot-toast";

//Dashboard pages
const DashboardHome = lazy(() => import("./Dashboard/DashboardHome"));
const Transactions = lazy(() => import("./Dashboard/pages/Transactions"));
const Savings = lazy(() => import("./Dashboard/pages/SavingsPage"));
const Budgets = lazy(() => import("./Dashboard/pages/BudgetPage"));
const Summary = lazy(() => import("./Dashboard/pages/Summary"));
const Profile = lazy(() => import("./Dashboard/pages/Profile"));

const router = createBrowserRouter([
    {
        path: "/signup",
        element: (
            <AuthRedirect>
                <SignupPage />
            </AuthRedirect>
        )
    },
    {
        path: "/auth/callback",
        element: (
            <AuthRedirect>
                <AuthCallback />
            </AuthRedirect>
        )
    },
    {
        path: "/auth/callback",
        element: (
            <AuthRedirect>
                <VerifyEmail />
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
        path: "forgotPassword",
        element: <ForgotPassword />
    },
    {
        path: "changePassword",
        element: <UpdatePassword />
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
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" replace />
    }
]);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />{" "}
                    <Toaster position="top-right" />
                    <Analytics />
                    <ReactQueryDevtools />
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
