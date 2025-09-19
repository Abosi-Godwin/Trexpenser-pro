import { useMutation, useQueryClient } from "@tanstack/react-query";

import { googleSignUp } from "../Apis/Authentication/googleSignUp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useGoogleSignUp = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: signUpWithGoogle, isPending: signUpWithGoogleIsPending } =
        useMutation({
            mutationFn: googleSignUp,
            onSuccess: data => {
              //console.log(data);
                //  queryClient.setQueryData(data);
                //  queryClient.invalidateQueries();
              //  navigate("/dashboard", { replace: true });
            },
            onError: err => {
                toast.error(err.message);
            }
        });

    return { signUpWithGoogle, signUpWithGoogleIsPending };
};
