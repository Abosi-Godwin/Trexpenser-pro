import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userLogOut } from "../../Utils/CustomMethods";

export const useLogIn = () => {
    const navigate = useNavigate();

    const {
        mutate: logOut,
        isPending: isLoggingOut,
        isSuccess: loggedOut
    } = useMutation({
        mutationFn: userLogOut,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        }
    });
    
    return { logOut, isLoggingOut, loggedOut };
};
