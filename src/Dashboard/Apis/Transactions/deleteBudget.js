import { supabase } from "../../Services/Supabase";
export const deleteBudgetApi = async budgetId => {
    
    const { error } = await supabase
        .from("budgets")
        .delete()
        .eq("id", budgetId);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
