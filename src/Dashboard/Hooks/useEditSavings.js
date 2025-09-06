import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { editSavingsApi } from "../Apis/Transactions/editSavings";

export const useEditSavings = () => {
    const queryClient = useQueryClient();

    const { mutate: editSavings, isPending: isEditingSavings } = useMutation({
        mutationFn: editSavingsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["savings"]
            });
            toast.success("Successfully edited!");
        },
        onError: () => {
            toast.error("Unable to edit savings.");
        }
    });
    return { editSavings, isEditingSavings };
};
