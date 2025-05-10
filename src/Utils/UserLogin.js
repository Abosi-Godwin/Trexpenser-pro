import supabase from "./Supabase.js";

export const userLoginFun = async ({ email, password }) => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
};
