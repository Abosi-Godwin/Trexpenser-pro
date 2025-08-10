import { useEffect, useState, useMemo } from "react";

import {
    formatCurrency,
    roundTotalPrice,
    roundDownPrice
} from "../Utils/CustomMethods";

import { useGetTransactions } from "./useGetTransactions";
export const useTransactions = () => {
    const { transactions } = useGetTransactions();
    
    const [currentUserTransactions, setCurrentUserTransactions] = useState([]);

    const [hasFetchedTransactions, setHasFetchedTransactions] = useState(false);

    const isEmpty = currentUserTransactions?.length <= 0;

    const incomes = currentUserTransactions.filter(
        transaction => transaction.type === "income"
    );

    const expenses = currentUserTransactions?.filter(
        transaction => transaction.type === "expense"
    );

    const expenseCategories = [
        ...new Set(expenses.map(expense => expense.category))
    ].map(category => ({ label: category, value: category.toLowerCase() }));

    const incomePrices = useMemo(
        () => incomes.map(income => income.amount),
        [incomes]
    );
    const expensePrices = useMemo(
        () => expenses.map(expense => expense.amount),
        [expenses]
    );

    const totalBalance = useMemo(
        () => formatCurrency(roundTotalPrice(currentUserTransactions)),
        [currentUserTransactions]
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
            setHasFetchedTransactions(true);
        }
    }, [transactions]);

    return {
        currentUserTransactions,
        hasFetchedTransactions,
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
