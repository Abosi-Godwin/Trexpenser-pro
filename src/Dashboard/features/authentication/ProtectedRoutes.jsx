import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../ui/Loader";

import { useAuth } from "../../contexts/AuthContext";
import { useLoader } from "../../Hooks/useLoader";

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { somethingIsLoading, isUserLoading } = useLoader();
    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        if (!isAuthenticated && !isUserLoading) {
            navigate("/login", {
                replace: true
            });
        }
    }, [isAuthenticated, isUserLoading, navigate]);

    if (somethingIsLoading) return <Loader />;

    return isAuthenticated && children;
};
export default ProtectedRoutes;
