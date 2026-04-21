import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { userSignUp } from "../apis/authentication/signUp";

export const useSignUp = () => {
    //const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(false);
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
            setEmailSent(true);
        }
    });
    return {
        signUp,
        emailSent,
        isSigningUp,
        signUpIsError,
        signUpError
    };
};
