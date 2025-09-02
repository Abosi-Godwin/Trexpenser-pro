import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../ui/Loader";

import { useAuth } from "../../contexts/AuthContext";
import { useLoader } from "../../Hooks/useLoader";

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const { user,isUserLoading } = useAuth();

    const { somethingIsLoading, allDatasLoaded } = useLoader();

    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        if (!isUserLoading && !isAuthenticated) {
            navigate("/login", {
                replace: true
            });
        }
    }, [isAuthenticated,isUserLoading, navigate]);

    if (somethingIsLoading || !allDatasLoaded) return <Loader />;

    return isAuthenticated && children;
};
export default ProtectedRoutes;
