import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getCurrentUser } from "../apis/authentication/getUser";
import { userLogOut } from "../apis/authentication/LogOut";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
 
    const {
  data: user,
  isPending: isUserLoading
} = useQuery({
  queryKey: ["user"],
  queryFn: getCurrentUser,
  staleTime: 1000 * 60 * 5,  
  retry: false, 
});

    const {
        mutate: logOut,
        isPending: isLoggingOut,
        isSuccess: loggedOut
    } = useMutation({
        mutationFn: userLogOut,
        onSuccess: () => {
            queryClient.removeQueries();
        }
    });

    return (
        <AuthContext.Provider
            value={{
                user,
                isUserLoading,
                isUserError,
                userError,
                logOut,
                isLoggingOut,
                loggedOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
