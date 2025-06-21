import {supabase} from "../../Services/Supabase"
import {sortData} from "../../Utils/sortDatas"
export const getUserBudgetsApi = async userId => {
    let { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    // console.log(data);
    return await sortData(data);
};
