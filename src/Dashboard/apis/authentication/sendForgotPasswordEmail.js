import { supabase } from "../../services/Supabase";
export const sendForgotPasswordEmailApi = async email => {
    const directTo = `${window.origin}/changePassword`;
    let { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: directTo
    });
    if (error) {
        console.error("Password reset failed:", error.message);
    } else {
        console.log("Password reset email sent! Check your inbox.");
    }

    return error;
};
