import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteTransactionApi } from "../Apis/Transactions/deleteTransaction";

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTransaction,
        isPending: isdeletingTransaction,
        
    } = useMutation({
        mutationFn: deleteTransactionApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            });
            toast.success("Transaction successfully deleted!");
        },
        onError: () => {
            toast.error("Unable to delete transaction.");
        }
    });
    return { deleteTransaction, isdeletingTransaction };
};
