import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AuthRedirect = ({ children }) => {
  
    const navigate = useNavigate();
    const { user } = useAuth();
    const isAuthenticated = user?.user?.role === "authenticated";

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return !isAuthenticated && children;
    
};

export default AuthRedirect;
