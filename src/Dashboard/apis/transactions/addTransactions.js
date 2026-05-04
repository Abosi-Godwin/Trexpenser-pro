import { supabase } from "../../services/Supabase";

export const addTransactionApi = async transaction => {
  
    const { data, error } = await supabase
        .from("transactions")
        .insert([{ ...transaction }])
        .select();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};
