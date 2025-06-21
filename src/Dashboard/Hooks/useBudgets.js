import { useQuery } from "@tanstack/react-query";
import { getUserBudgetsApi } from "../Apis/Transactions/getBudgets";

export const useBudgets = userId => {
    const {
        data: budgets,
        error: budgetsError,
        isError: isBudgetsError,
        isPending: isBudgetsLoading
    } = useQuery({
        queryKey: ["budgets"],
        queryFn: () => getUserBudgetsApi(userId),
        enabled: !!userId
    });

    return { budgets, budgetsError, isBudgetsLoading, isBudgetsError };
};
