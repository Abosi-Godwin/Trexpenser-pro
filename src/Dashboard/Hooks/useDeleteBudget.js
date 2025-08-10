import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteBudgetApi } from "../Apis/Transactions/deleteBudget";

export const useDeleteBudget = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteBudget, isPending: isdeletingBudget } = useMutation({
        mutationFn: deleteBudgetApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["budgets"]
            });
            toast.success("Budget successfully deleted!");
        },
        onError: () => {
            toast.error("Unable to delete budget.");
        }
    });
    return { deleteBudget, isdeletingBudget };
};
