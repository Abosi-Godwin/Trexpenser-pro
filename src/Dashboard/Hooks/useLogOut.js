import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userLogOut } from "../Apis/Authentication/LogOut";

export const useLogOut = () => {
    const queryClient = useQueryClient();

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

    return { logOut, isLoggingOut, loggedOut };
};
