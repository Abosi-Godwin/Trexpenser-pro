import { supabase } from "../../Services/Supabase";
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
