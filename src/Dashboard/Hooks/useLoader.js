import { useAuth } from "../contexts/AuthContext";
import { useLogIn } from "./useLogIn";
import { useLogOut } from "./useLogOut";
import { useBudgets } from "./useBudgets";
import { useTransactions } from "./useTransactions";
import { useGetSavings } from "./useGetSavings";

export const useLoader = () => {
    const { isUserLoading } = useAuth();
    const { loginIsPending } = useLogIn();
    const { isLoggingOut } = useLogOut();
    const { isBudgetsLoading } = useBudgets();
    const { isSavingsLoading } = useGetSavings();
    const { istransactionsLoading } = useTransactions();

    const somethingIsLoading =
        isUserLoading ||
        isSavingsLoading ||
        istransactionsLoading ||
        isBudgetsLoading ||
        loginIsPending ||
        isLoggingOut;

    return { somethingIsLoading,isUserLoading };
};
