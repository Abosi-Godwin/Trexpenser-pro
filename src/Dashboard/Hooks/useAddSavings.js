import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addSavingsApi } from "../Apis/Transactions/adSavings";

export const useAddSavings = () => {
    const queryClient = useQueryClient();

    const {
        mutate: addSavings,
        isPending: isAddingSavings,
        onSuccess: isSuccessful
    } = useMutation({
        mutationFn: addSavingsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["savings"]
            });
            toast.success("Savings successfully created!");
        },
        onError: () => {
            toast.error("Unable to create");
        }
    });

    return {
        addSavings,
        isAddingSavings,isSuccessful
    };
};
