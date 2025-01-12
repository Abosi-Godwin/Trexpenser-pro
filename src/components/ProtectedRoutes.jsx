import { useAuth } from "../contexts/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    return children;
};
export default ProtectedRoutes;
