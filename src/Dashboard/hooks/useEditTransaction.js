import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { editTransactionApi } from "../apis/transactions/editTransaction";

export const useEditTransaction = () => {
    const queryClient = useQueryClient();

    const { mutate: editTransaction, isPending: isEditingTransaction } =
        useMutation({
            mutationFn: editTransactionApi,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["transactions"]
                });
                toast.success("Successfully edited!");
            },
            onError: () => {
                toast.error("Unable to edit transaction.");
            }
        });
    return { editTransaction, isEditingTransaction };
};
