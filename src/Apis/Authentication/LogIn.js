import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../../Utils/CustomMethods";
//console.log(userLogIn);
export const useLogIn = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        data: userDta,
        mutate: logIn,
        isPending: loginIsPending,
        error: logInError,
        isError: logInIsError
    } = useMutation({
        mutationFn: userLogIn,
        onSuccess: data => {
            queryClient.setQueryData(data);
            queryClient.invalidateQueries({ queryKey: ["user"] });
            navigate("/dashboard", { replace: true });
        }
    });

    return { logIn, userDta, logInIsError, logInError, loginIsPending };
};
