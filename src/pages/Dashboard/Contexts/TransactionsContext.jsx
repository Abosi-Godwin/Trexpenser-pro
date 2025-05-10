import { useReducer, useContext, createContext } from "react";

import { datas, budgets, savingsGoals } from "../../../data/data";

const TransactionsContext = createContext();

const useTransactions = () => useContext(TransactionsContext);

const transactionsVals = {
    transactions: [...datas],
    budgets: [...budgets],
    savingsGoals: [...savingsGoals],
    incomes: [...datas].filter(d => d.type === "income"),
    expenses: [...datas].filter(d => d.type === "expense")
};

const reducer = (state, action) => {
    switch (action.type) {
        case "transactions/add":
            return [...state.transactions, action.payLoad];
        default:
            throw new Error("Unknown action");
    }
};

const TransactionsProvider = ({ children }) => {
    const [{ transactions, budgets, savingsGoals, incomes, expenses}, dispatch] = useReducer(
        reducer,
        transactionsVals
    );

    const addExpenses = expensesObj => {
        dispatch({ type: "add", payLoad: expensesObj });
    };

    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                budgets,
                savingsGoals,
                addExpenses,
                incomes,
                expenses
            }}
        >
            {children}
        </TransactionsContext.Provider>
    );
};

export { TransactionsProvider, useTransactions };
