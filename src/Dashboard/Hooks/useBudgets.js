import { useQuery } from "@tanstack/react-query";
import { format, compareAsc } from "date-fns";

import { getUserBudgetsApi } from "../Apis/Transactions/getBudgets";

import { useUser } from "./useUser";
import { useTransactions } from "./useTransactions";
import { roundDownPrice } from "../Utils/CustomMethods";

export const useBudgets = () => {
    const { userId } = useUser();

    const { expenses } = useTransactions();

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

    const categories = [
        ...new Set(budgets?.map(budget => budget.category.toLowerCase()))
    ];

    const startDate = budgets
        ?.map(budget => budget.start_date)
        .sort((a, b) => new Date(a) - new Date(b))[0];

    const endDate = budgets
        ?.map(budget => budget.end_date)
        .sort((a, b) => new Date(a) - new Date(b))
        .reverse()[0];

    const spendingLimit = roundDownPrice(budgets?.map(budget => budget.amount));

    const totalSpent = roundDownPrice(
        budgets?.flatMap(budget =>
            expenses
                .filter(
                    item =>
                        item.category.toLowerCase() ===
                            budget.category.toLowerCase() &&
                        item.date >= budget.start_date &&
                        item.date <= budget.end_date
                )
                .map(expense => expense.amount)
        )
    );
    const spentPercent = Math.floor((totalSpent / spendingLimit) * 100);

    const minMaxDate = budgets
        ?.flatMap(budget => [
            new Date(budget.start_date),
            new Date(budget.end_date)
        ])
        .sort(compareAsc)
        .filter((_, index, arr) => index === 0 || index === arr.length - 1)
        ?.map(date => format(date, "MMM, dd, yyyy"));

    return {
        budgets,
        budgetsError,
        isBudgetsLoading,
        isBudgetsError,
        startDate,
        endDate,
        categories,
        spendingLimit,
        spentPercent,
        totalSpent,
        minMaxDate
    };
};
