import { supabase } from "../../Services/Supabase";

export const editTransactionApi = async ({ entries, id }) => {
    console.log(entries);

    const { data, error } = await supabase
        .from("transactions")
        .update({ ...entries })
        .eq("id", id)
        .select();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};
