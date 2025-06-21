import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogOut } from "../Apis/Authentication/LogOut";
import { useNavigate } from "react-router";
export const useLogOut = () => {
    const queryClient = useQueryClient();
    

    const {
        mutate: logOut1,
        isPending: isLoggingOut,
        isSuccess: loggedOut
    } = useMutation({
        mutationFn: userLogOut,
        onSuccess: () => {
            queryClient.removeQueries();
          
            // queryClient.invalidateQueries(["user"]);
        }
    });

    return { logOut1, isLoggingOut, loggedOut };
};
