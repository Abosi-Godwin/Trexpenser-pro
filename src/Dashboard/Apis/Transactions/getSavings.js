import { supabase } from "../../Services/Supabase";
import {sortData} from "../../Utils/sortDatas"
export const getSavingsApi = async userId => {
    let { data, error } = await supabase
        .from("savings")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return sortData(data);
};
