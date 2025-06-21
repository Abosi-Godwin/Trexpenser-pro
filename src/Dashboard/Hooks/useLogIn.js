import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../Apis/Authentication/LogIn";
import { toast } from "react-hot-toast";


export const useLogIn = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate: logIn,
        isPending: logInIsPending,
        error: logInError,
        isError: logInIsError
    } = useMutation({
        mutationFn: userLogIn,
        onSuccess: data => {
            queryClient.setQueryData(data);
            queryClient.invalidateQueries();
            navigate("/dashboard", { replace: true });
        },
        onError: err => {
            toast.error(err.message);
        }
    });

    return { logIn, logInIsError, logInError, logInIsPending };
};
