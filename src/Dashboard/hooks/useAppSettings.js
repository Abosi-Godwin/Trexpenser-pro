import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../services/Supabase";
import { useUser } from "../Hooks/useUser";
import toast from "react-hot-toast";

export const useAppSettings = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();

    const settings = {
        currency: user?.user_metadata?.currency ?? "NGN",
        dateFormat: user?.user_metadata?.dateFormat ?? "dd/MM/yyyy",
        defaultPage: user?.user_metadata?.defaultPage ?? "/",
        darkMode: user?.user_metadata?.darkMode ?? false
    };

    const { mutate: saveSettings, isPending: isSaving } = useMutation({
        mutationFn: async data => {
            const { error } = await supabase.auth.updateUser({
                data: {
                    currency: data.currency,
                    dateFormat: data.dateFormat,
                    defaultPage: data.defaultPage,
                    darkMode: data.darkMode
                }
            });

            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Settings saved.");
        },
        onError: err => {
            toast.error(err.message || "Failed to save settings.");
        }
    });

    return { settings, saveSettings, isSaving };
};
