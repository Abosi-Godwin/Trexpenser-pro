import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateProfilePic } from "../Apis/Authentication/updateProfilePic";

export const useUpdatePic = () => {
    const queryClient = useQueryClient();

    const {
        mutate: updatePic,
        data: updatedPic,
        isPending: isUpDatingPic,
        isError: isUpDatingPicError,
        isSuccess: isUpDatingPicSucces
    } = useMutation({
        mutationFn: updateProfilePic,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
            toast.success("picture successfully updated!");
        },
        onError: () => {
            toast.error("Unable to update picture");
        }
    });

    return {
        updatePic,
        updatedPic,
        isUpDatingPic,
        isUpDatingPicSucces,
        isUpDatingPicError
    };
};
