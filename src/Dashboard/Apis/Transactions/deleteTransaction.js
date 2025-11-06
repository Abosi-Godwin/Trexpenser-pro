import { supabase } from "../../services/Supabase";
export const deleteTransactionApi = async transactionId => {
    
    const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
