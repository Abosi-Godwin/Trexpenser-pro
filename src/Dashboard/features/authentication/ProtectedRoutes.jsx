import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../Hooks/useUser";
import { useLoader } from "../../Hooks/useLoader";

import Loader from "../../ui/Loader";

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();

    const { userIsAuthenticated } = useUser();
    const { somethingIsLoading } = useLoader();
    
    useEffect(() => {
        if (!somethingIsLoading && !userIsAuthenticated) {
            navigate("/login", {
                replace: true
            });
        }
    }, [userIsAuthenticated, somethingIsLoading, navigate]);

    if (somethingIsLoading) return <Loader />;

    return userIsAuthenticated && children;
};
export default ProtectedRoutes;
