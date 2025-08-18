import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateSavingsApi } from "../Apis/Transactions/updateSavings";

export const useUpdateSavings = () => {
    const queryClient = useQueryClient();

    const {
        mutate: updateSavings,
        isPending: isUpdatingSavings,
        onSuccess: isUpdateSuccessful
    } = useMutation({
        mutationFn: updateSavingsApi,
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
        updateSavings,
        isUpdatingSavings,
        isUpdateSuccessful
    };
};
