import { useAuth } from "../contexts/AuthContext";
import { useLogIn } from "./useLogIn";
import { useLogOut } from "./useLogOut";
import { useBudgetsData } from "./useBudgetsData";
import { useGetSavings } from "./useGetSavings";
import { useGetTransactions } from "./useGetTransactions";
export const useLoader = () => {
    const { isUserLoading } = useAuth();
    const { loginIsPending } = useLogIn();
    const { isLoggingOut } = useLogOut();
    //  const { isBudgetsLoading } = useBudgetsData();
    const { isSavingsLoading } = useGetSavings();
    const { istransactionsLoading } = useGetTransactions();
   // console.log(isBudgetsLoading);
    const somethingIsLoading =
        isUserLoading ||
        istransactionsLoading ||
        isSavingsLoading ||
        //  isBudgetsLoading ||
        loginIsPending ||
        isLoggingOut;

    return { somethingIsLoading };
};
