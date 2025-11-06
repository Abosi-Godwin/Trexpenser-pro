import { useMutation } from "@tanstack/react-query";
import { sendForgotPasswordEmailApi } from "../apis/authentication/sendForgotPasswordEmail";

export const useSendForgotPassword = () => {
    const {
        data: isError,
        mutate: sendEmail,
        isPending: sendingEmail
    } = useMutation({
        mutationFn: sendForgotPasswordEmailApi
    });
    const error = isError;
 
    return { sendEmail, sendingEmail, error };
};
