import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../ui/Loader";

import { useAuth } from "../../contexts/AuthContext";
import { useLoader } from "../../Hooks/useLoader";

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();

    const { user, isUserLoading } = useAuth();

    const { somethingIsLoading, allDatasLoaded } = useLoader();

    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        if (!isUserLoading && !isAuthenticated) {
            navigate("/login", {
                replace: true
            });
        }
    }, [isAuthenticated, isUserLoading, navigate]);

    if (isUserLoading || somethingIsLoading || !allDatasLoaded)
        return <Loader />;

    // Block unverified users
    if (!user.email_confirmed_at) {
      navigate("/verify-email", {replace: true });
    }

    return isAuthenticated && children;
};
export default ProtectedRoutes;
