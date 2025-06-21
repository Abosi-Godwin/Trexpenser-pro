import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addTransactionApi } from "../Apis/Transactions/addTransactions";

export const useAddTransaction = () => {
    const queryClient = useQueryClient();
    const {
        mutate: addTransaction,
        data: addedTransaction,
        isPending: isAddingTransaction,
        isError: isAddingTransactionError,
        isSuccess: isAddingTransactionSucces
    } = useMutation({
        mutationFn: addTransactionApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            });
            toast.success("Transaction successfully added!");
        },
        onError: () => {
            toast.error("Unable to add transaction.");
        }
    });

    return {
        addTransaction,
        addedTransaction,
        isAddingTransaction,
        isAddingTransactionError,
        isAddingTransactionSucces
    };
};
