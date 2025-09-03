import { useEffect, useState, useMemo } from "react";

import {
    formatCurrency,
    roundTotalPrice,
    roundDownPrice
} from "../Utils/CustomMethods";

import { useGetTransactions } from "./useGetTransactions";
import { useGetSavings } from "./useGetSavings";

export const useTransactions = () => {
    const { transactions, transactionLoaded, istransactionsLoading } =
        useGetTransactions();
    const { totalSaved } = useGetSavings();

    const [currentUserTransactions, setCurrentUserTransactions] = useState([]);

    const isEmpty = currentUserTransactions?.length <= 0;

    const incomes = currentUserTransactions.filter(
        transaction => transaction.type.toLowerCase() === "income"
    );

    const expenses = currentUserTransactions?.filter(
        transaction => transaction.type.toLowerCase() === "expense"
    );

    const expenseCategories = [
        ...new Set(expenses.map(expense => expense.category.toLowerCase()))
    ].map(category => ({
        label: category.at(0).toUpperCase() + category.slice(1),
        value: category
    }));

    const incomePrices = useMemo(
        () => incomes.map(income => income.amount),
        [incomes]
    );
    const expensePrices = useMemo(
        () => expenses.map(expense => expense.amount),
        [expenses]
    );

    const totalBalance = useMemo(
        () =>
            formatCurrency(
                roundTotalPrice(currentUserTransactions) - totalSaved
            ),
        [currentUserTransactions, totalSaved]
    );

    const totalIncome = useMemo(
        () => formatCurrency(roundDownPrice(incomePrices)),
        [incomePrices]
    );
    const totalExpenses = useMemo(
        () => formatCurrency(roundDownPrice(expensePrices)),
        [expensePrices]
    );

    useEffect(() => {
        if (transactions) {
            setCurrentUserTransactions(transactions);
        }
    }, [transactions]);

    return {
        currentUserTransactions,
      transactionLoaded,
        istransactionsLoading,
        isEmpty,
        incomes,
        expenses,
        incomePrices,
        expensePrices,
        totalIncome,
        totalExpenses,
        totalBalance,
        expenseCategories
    };
};
