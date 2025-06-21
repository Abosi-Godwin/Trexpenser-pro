import { useQuery } from "@tanstack/react-query";
import { getSavingsApi } from "../Apis/Transactions/getSavings";
const useGetSavings = userId => {
    const {
        data: savings,
        error: savingsError,
        isError: isSavingsError,
        isPending: isSavingsLoading
    } = useQuery({
        queryKey: ["savings"],
        queryFn: () => getSavingsApi(userId),
        enabled: !!userId
    });

    return { savings, savingsError, isSavingsLoading };
};
