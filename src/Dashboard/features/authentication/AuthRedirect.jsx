
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AuthRedirect = ({ children }) => {
    const navigate = useNavigate();
    const { user, isUserLoading } = useAuth();

    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        if (!isUserLoading && isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, isUserLoading, navigate]);

    if (isUserLoading) return null;

    return !isAuthenticated ? <>{children}</> : null;
};

export default AuthRedirect;
