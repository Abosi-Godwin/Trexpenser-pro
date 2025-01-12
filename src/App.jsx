import OnboardPage from "./pages/Onboard.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.jsx";

import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
const App = () => {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<OnboardPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoutes>
                                    <Dashboard />
                                </ProtectedRoutes>
                            }
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
};
export default App;
