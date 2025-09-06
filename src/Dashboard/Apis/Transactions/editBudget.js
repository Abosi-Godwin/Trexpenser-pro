import { supabase } from "../../Services/Supabase";

export const editBudgetApi = async ({ newBudget, id }) => {
    const { data, error } = await supabase
        .from("budgets")
        .update({ ...newBudget })
        .eq("id", id)
        .select();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
};
