import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import { useAuth } from "../../contexts/AuthContext";
import { useLoader } from "../../hooks/useLoader";

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const { user, isUserLoading } = useAuth();
    const { somethingIsLoading, allDatasLoaded } = useLoader();

    const isAuthenticated = user?.role === "authenticated";
    const isEmailVerified = !!user?.email_confirmed_at;

    useEffect(() => {
        if (isUserLoading) return;

        if (!isAuthenticated) {
            navigate("/login", { replace: true });
            return;
        }

        if (!isEmailVerified) {
            navigate("/verify-email", { replace: true });
        }
    }, [isAuthenticated, isEmailVerified, isUserLoading, navigate]);

    if (isUserLoading || somethingIsLoading || !allDatasLoaded) {
        return <Loader />;
    }

    if (!isAuthenticated || !isEmailVerified) return null;

    return <>{children}</>;
};

export default ProtectedRoutes;
