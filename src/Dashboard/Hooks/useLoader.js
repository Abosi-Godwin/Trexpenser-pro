import { useAuth } from "../contexts/AuthContext";
import { useLogIn } from "./useLogIn";
import { useLogOut } from "./useLogOut";
import { useBudgets } from "./useBudgets";
import { useGetSavings } from "./useGetSavings";
import { useGetTransactions } from "./useGetTransactions";
export const useLoader = () => {
    const { isUserLoading } = useAuth();
    const { loginIsPending } = useLogIn();
    const { isLoggingOut } = useLogOut();
    const { isBudgetsLoading } = useBudgets();
    const { isSavingsLoading } = useGetSavings();
    const { istransactionsLoading } = useGetTransactions();

    const somethingIsLoading =
        isUserLoading ||
        istransactionsLoading ||
        isSavingsLoading ||
        loginIsPending ||
        isLoggingOut;

       // isBudgetsLoading ||
    return { somethingIsLoading };
};
