import { supabase } from "../../Services/Supabase";

export const googleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/transaction`
        }
    });

    if (error) {
        console.error("Google sign-in error:", error.message);
    }
};
