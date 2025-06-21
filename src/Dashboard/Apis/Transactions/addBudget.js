import { supabase } from "../../Services/Supabase";

export const addBudgetApi = async budgetData => {
  
     const { data, error } = await supabase.from("budgets").insert([budgetData]).select();

     if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }

    return data;
};
