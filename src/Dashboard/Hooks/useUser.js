import { useAuth } from "../contexts/AuthContext";

export const useUser = () => {
    const { user, userError, isUserError, isUserLoading } = useAuth();
console.log(user);
    const userId = user?.id;
    const lastSeen = user?.last_sign_in_at;
    const newUser =
        new Date(user?.last_sign_in_at) === new Date(user?.created_at);
    const userIsAuthenticated = user?.role === "authenticated";
    const userName =
        user?.user_metadata?.full_name || user?.user_metadata?.userName;
    const userEmail = user?.user_metadata?.email;
    const userImage =
        user?.user_metadata?.picture || user?.user_metadata?.avatar_url;
    console.log("new user", newUser);
    return {
        user,
        userId,
        userName,
        userEmail,
        lastSeen,
        userImage,
        userIsAuthenticated,
        userError,
        isUserLoading,
        isUserError
    };
};
