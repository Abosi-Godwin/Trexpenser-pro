import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { userSignUp } from "../Apis/Authentication/signUp";

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
        onError: err => {
            toast.error(err.message);
            console.error("Error signing up", err);
        },
        onSuccess: data => {
            console.log("success", data);
            navigate("/login", { replace: true });
        }
    });
    return { signUp, isSigningUp, signUpIsError, signUpError };
};
