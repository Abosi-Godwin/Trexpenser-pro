import { useMutation, useQueryClient } from "@tanstack/react-query";
 
import { toast } from "react-hot-toast";

import { googleSignUp } from "../apis/authentication/googleSignUp";

export const useGoogleSignUp = () => {
    const queryClient = useQueryClient();
   

    const { mutate: signUpWithGoogle, isPending: signUpWithGoogleIsPending } =
        useMutation({
            mutationFn: googleSignUp,
            onSuccess: () => {
                queryClient.invalidateQueries("user");
            },
            onError: err => {
                toast.error(err.message);
            }
        });

    return { signUpWithGoogle, signUpWithGoogleIsPending };
};
