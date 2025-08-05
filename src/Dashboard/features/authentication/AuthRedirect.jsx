import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../Hooks/useUser";

const AuthRedirect = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const isAuthenticated = user?.role === "authenticated";
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return !isAuthenticated && children;
};

export default AuthRedirect;
