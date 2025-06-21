import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import Loader from "../../ui/Loader";


import { useAuth } from "../../contexts/AuthContext";
import { useLoader } from "../../Hooks/useLoader";


const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const somethingIsLoading = useLoader();

    const authenticated = user?.user?.role === "authenticated";

    useEffect(() => {
        if (!authenticated && !somethingIsLoading) {
             navigate("/login");
        }
    }, [authenticated, somethingIsLoading, navigate]);

    if (somethingIsLoading) return <Loader />;

    return authenticated && children;
};
export default ProtectedRoutes;
