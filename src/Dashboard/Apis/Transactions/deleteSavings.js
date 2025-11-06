import { supabase } from "../../services/Supabase";
export const deleteSavingsApi = async savingsId => {
    
    const { error } = await supabase
        .from("savings")
        .delete()
        .eq("id", savingsId);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
