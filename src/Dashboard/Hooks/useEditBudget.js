import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { editBudgetApi } from "../Apis/Transactions/editBudget";

export const useEditBudget = () => {
    const queryClient = useQueryClient();

    const { mutate: editBudget, isPending: isEditingBudget } = useMutation({
        mutationFn: editBudgetApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["budgets"]
            });
            toast.success("Successfully edited!");
        },
        onError: () => {
            toast.error("Unable to edit budget.");
        }
    });
    return { editBudget, isEditingBudget };
};
