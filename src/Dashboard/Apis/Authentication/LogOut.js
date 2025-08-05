import { supabase } from "../../Services/Supabase";

export const userLogOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
  
};
