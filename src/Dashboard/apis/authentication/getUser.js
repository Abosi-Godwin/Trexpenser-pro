import { supabase } from "../../services/Supabase";

export const getCurrentUser = async () => {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) {
        if (error.message === "Auth session missing!") return null;
        throw new Error(error.message);
    }

    return user ?? null;
};
