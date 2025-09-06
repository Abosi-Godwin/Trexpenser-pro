import { supabase } from "../../Services/Supabase";

export const editSavingsApi = async ({ newSavings, id }) => {
     
    const { data, error } = await supabase
        .from("savings")
        .update({ ...newSavings })
        .eq("id", id)
        .select();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
};
