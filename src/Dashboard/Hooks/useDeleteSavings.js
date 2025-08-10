import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteSavingsApi } from "../Apis/Transactions/deleteSavings";

export const useDeleteSavings = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteSavings, isPending: isdeletingSavings } =
        useMutation({
            mutationFn: deleteSavingsApi,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["savings"]
                });
                toast.success("Savings successfully deleted!");
            },
            onError: () => {
                toast.error("Unable to delete savings.");
            }
        });
    return { deleteSavings, isdeletingSavings };
};
