import { supabase } from "../../Services/Supabase";
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
