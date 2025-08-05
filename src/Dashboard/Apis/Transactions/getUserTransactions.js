import {sortData} from "../../Utils/sortDatas"
import {supabase} from "../../Services/Supabase"
export const getUserTransactions = async userId => {
    const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return sortData(data);
};
