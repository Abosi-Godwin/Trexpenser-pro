import { supabase } from "../Utils/Supabase";
import { queryClient } from "../Utils/queryClient";
import { getUserTransactions } from "../Utils/CustomMethods";

export const checkUserSession = async () => {
    const { data: session } = await supabase.auth.getSession();

    if (session?.session?.user) {
        const userId = session.session.user.id;
console.log("user id",userId)
        // Prefetch the data immediately
        await queryClient.prefetchQuery({
            queryKey: ["transactions", userId],
            queryFn: () => getUserTransactions(userId)
        });
    }

    return session;
};
