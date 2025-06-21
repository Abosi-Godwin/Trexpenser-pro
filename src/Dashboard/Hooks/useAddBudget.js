import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addBudgetApi } from "../Apis/Transactions/addBudget";

export const useAddBudget = () => {
    const queryClient = useQueryClient();

    const {
        mutate: addBudget,
        data: addedBudget,
        isPending: isAddingBudget,
        isError: isAddingBudgetError,
        isSuccess: isAddingBudgetSucces
    } = useMutation({
        mutationFn: addBudgetApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Budgets"]
            });
            toast.success("Budget successfully added!");
        },
        onError: () => {
            toast.error("Unable to add budget.");
        }
    });

    return {
        addBudget,
        addedBudget,
        isAddingBudget,
        isAddingBudgetError,
        isAddingBudgetSucces
    };
};
