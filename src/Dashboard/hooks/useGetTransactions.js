import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { getUserTransactions } from "../apis/transactions/getUserTransactions";
export const useGetTransactions = () => {
    const { userId } = useUser();
    const {
        data: transactions,
        isPending: istransactionsLoading,
        isSuccess: transactionLoaded
    } = useQuery({
        queryKey: ["transactions"],
        queryFn: () => getUserTransactions(userId),
        onSuccess: () => {},
        enabled: !!userId
    });

    return { transactions,transactionLoaded, istransactionsLoading };
};
