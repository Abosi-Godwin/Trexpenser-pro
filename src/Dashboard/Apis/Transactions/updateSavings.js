import { supabase } from "../../Services/Supabase";
export const updateSavingsApi = async info => {
    const { savingsId, amountToSave } = info;
    const { data, error } = await supabase
        .from("savings")
        .update({ amount_saved: amountToSave })
        .eq("id", savingsId)
        .select();

    if (error) {
        console.error("updating savings error", error);
        throw new Error(error.message);
    }
    return data;
};
