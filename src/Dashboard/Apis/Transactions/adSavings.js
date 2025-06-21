import { supabase } from "../../Services/Supabase";
export const addSavings = async savingsObj => {
    
    const { data, error } = await supabase
        .from("savings")
        .insert([{ ...savingsObj }])
        .select();

    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
    return data;
};
