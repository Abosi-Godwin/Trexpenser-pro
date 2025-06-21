import { format, compareAsc } from "date-fns";

import { useUser } from "./useUser";
import { useBudgets } from "./useBudgets";
import { useTransactions } from "./useTransactions";
import { roundDownPrice } from "../Utils/CustomMethods";

export const useBudgetsData = () => {
    const {
        user: { id }
    } = useUser();

    const userId = id;
    const { budgets } = useBudgets(userId);
    const { expenses } = useTransactions();

    const categories = [...new Set(budgets?.map(budget =>
    budget.category.toLowerCase()))];

    const startDate = budgets
        ?.map(budget => budget.start_date)
        .sort((a, b) => new Date(a) - new Date(b))[0];

    const endDate = budgets
        ?.map(budget => budget.end_date)
        .sort((a, b) => new Date(a) - new Date(b))
        .reverse()[0];

    const spendingLimit = budgets
        ?.map(budget => budget.amount)
        ?.reduce((acc, ini) => acc + ini);
    const totalSpent = expenses
        ?.filter(
            expense => expense.date >= startDate && expense.date <= endDate
        )
        ?.filter(expense => categories.includes(expense.category))
        ?.map(expense => expense.amount)
        ?.reduce((acc, ini) => acc + ini, 0);

    const spentPercent = Math.floor((totalSpent / spendingLimit) * 100);

    const totalBudgetAmount = roundDownPrice(
        budgets?.map(budget => budget.amount)
    );
    const minMaxDate = budgets
        ?.flatMap(budget => [
            new Date(budget.start_date),
            new Date(budget.end_date)
        ])
        .sort(compareAsc)
        .filter((_, index, arr) => index === 0 || index === arr.length - 1)
        .map(date => format(date, "MMM, dd, yyyy"));

    return {
        budgets,
        startDate,
        endDate,
        categories,
        spendingLimit,
        spentPercent,
        totalSpent,
        minMaxDate,
        totalBudgetAmount
    };
};
