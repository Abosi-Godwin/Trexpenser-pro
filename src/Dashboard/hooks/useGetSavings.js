import { useQuery } from "@tanstack/react-query";
import { getSavingsApi } from "../apis/transactions/getSavings";
import { useUser } from "./useUser";


import { roundDownPrice } from "../utils/CustomMethods";

export const useGetSavings = () => {
    const { userId } = useUser();
    
    const {
        data: savings,
        error: savingsError,
        isPending: isSavingsLoading,
        isSuccess: isSavingsLoaded
    } = useQuery({
        queryKey: ["savings"],
        queryFn: () => getSavingsApi(userId),
        enabled: !!userId
    });

    const totalSaved = roundDownPrice(
        savings?.map(saving => saving.amount_saved)
    );

    return {
        savings,
        totalSaved,
        savingsError,
        isSavingsLoading,
        isSavingsLoaded
    };
};
