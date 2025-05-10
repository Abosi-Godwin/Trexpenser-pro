//Modules
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

//Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SubscriptionPage from "./pages/Subscription";

//Components
import ProtectedRoutes from "./pages/Components/ProtectedRoutes";
import AuthRedirect from "./pages/Components/AuthRedirect";
import DashboardLayout from "./pages/Dashboard/ui/DashboardLayout";

//Dashboard pages
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Transactions from "./pages/Dashboard/pages/Transactions";
import Savings from "./pages/Dashboard/pages/SavingsPage";
import Budgets from "./pages/Dashboard/pages/BudgetPage";
import Summary from "./pages/Dashboard/pages/Summary";
import Profile from "./pages/Dashboard/pages/Profile";

//Provideers
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TransactionsProvider } from "./pages/Dashboard/Contexts/TransactionsContext";
import { store } from "./store";
import { loader as imgLoader } from "./Utils/ImgLoader";
import { queryClient } from "./Utils/queryClient";

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
            },
            {
                path: "/dashboard/summary",
                element: <Summary />
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
