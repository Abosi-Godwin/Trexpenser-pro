import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useLogIn } from "./useLogIn";
import { useLogOut } from "./useLogOut";
import { useBudgets } from "./useBudgets";
import { useTransactions } from "./useTransactions";
import { useGetSavings } from "./useGetSavings";

export const useLoader = () => {
    const { loginIsPending } = useLogIn();
    const { isLoggingOut } = useLogOut();

    const { isUserLoading } = useAuth();
    const { isBudgetsLoading, isBudgetsLoaded } = useBudgets();
    const { isSavingsLoading, isSavingsLoaded } = useGetSavings();
    const { istransactionsLoading, transactionLoaded } = useTransactions();

    const somethingIsLoading =
        isUserLoading ||
        isSavingsLoading ||
        istransactionsLoading ||
        isBudgetsLoading ||
        loginIsPending ||
        isLoggingOut;

    const allDatasLoaded =transactionLoaded && isBudgetsLoaded && isSavingsLoaded;

    return { somethingIsLoading, allDatasLoaded };
};
