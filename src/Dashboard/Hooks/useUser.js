import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../Apis/Authentication/getUser";
export const useUser = () => {
    const {
        data: { user },
        error: userError,
        isError: isUserError,
        isPending: isUserLoading
    } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser
    });

    const userId = user.id;
    const userIsAuthenticated = user.role === "authenticated";
    const userName =
        user.user_metadata.full_name || user.user_metadata.userName;
    const userEmail = user.user_metadata.email;
    const userImage =
        user.user_metadata.picture || user.user_metadata.avatar_url;

    return { user,userId,userName,userEmail,userImage, userIsAuthenticated, userError, isUserLoading, isUserError };
};
