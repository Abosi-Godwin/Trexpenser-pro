import { useAuth } from "../contexts/AuthContext";

export const useLoader = () => {
  
  
    const { isUserLoading, istransactionsLoading, loginIsPending, isLoggingOut } = useAuth();
    
    
    const somethingIsLoading =
        loginIsPending ||
        isUserLoading ||
        istransactionsLoading ||
        isLoggingOut;

    return somethingIsLoading;
};
