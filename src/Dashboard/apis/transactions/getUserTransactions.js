import { sortData } from "../../utils/sortDatas";
import { supabase } from "../../services/Supabase";
export const getUserTransactions = async (userId) => {
  const { data, error } = await supabase.from("transactions").select("*").eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return sortData(data);
};
