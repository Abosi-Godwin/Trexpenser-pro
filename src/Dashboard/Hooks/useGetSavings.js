import { useQuery } from "@tanstack/react-query";
import { getSavingsApi } from "../Apis/Transactions/getSavings";
import { useUser } from "./useUser";

import { roundDownPrice } from "../Utils/CustomMethods";

export const useGetSavings = () => {
    const { userId } = useUser();
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

    const totalSaved = roundDownPrice(
        savings?.map(saving => saving.amount_saved)
    );

    return { savings, totalSaved, savingsError, isSavingsLoading };
};
