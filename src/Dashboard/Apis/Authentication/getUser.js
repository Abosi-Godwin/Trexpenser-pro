import { supabase } from "../../Services/Supabase";

export const getCurrentUser = async () => {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) return null;

    const { data: {user}, error } = await supabase.auth.getUser();
    

    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }

    return user;
};
