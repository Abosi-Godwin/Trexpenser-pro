import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userSignUp } from "../../Utils/CustomMethods";

export const useSignUp = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        mutate: signUp,
        isPending: isSigningUp,
        isError: signUpIsError,
        error: signUpError
    } = useMutation({
        mutationFn: userSignUp,
        onError: err => console.error("Error signing up", err),
        onSuccess: data => {

            navigate("/login", { replace: true });
        }
    });
    return { signUp, isSigningUp, signUpIsError, signUpError };
};
