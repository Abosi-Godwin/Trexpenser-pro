import { supabase } from "../../services/Supabase";

export const userLogIn = async ({ email, password }) => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
};
 