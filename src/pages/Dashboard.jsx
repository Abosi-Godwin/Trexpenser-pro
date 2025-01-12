import { useState } from "react";

import { TransactionsProvider } from "../contexts/TransactionsContext.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
/*
import Expenses from "../components/ExpenseItems.jsx";
import Summary from "../components/Summary.jsx";
import BudgetPlanning from "../components/BudgetPlanning.jsx";
import SavingGoals from "../components/SavingGoals.jsx";
*/
//import expenesArray from "../data/DoughnutDatas.js";

const Dashboard = () => {
    /*
  const [expenses, setExpenses] = useState(datas);
    

    function handleAddExpenses(expenseObj) {
        setExpenses([...expenses, expenseObj]);
    }

    function handleDataEditted(data) {
        setExpenses(() =>
            expenses.map(item => {
                return item.id === data.id ? { ...data } : item;
            })
        );
    }

    function handleDataDeleted(data) {
        setExpenses(() => expenses.filter(item => item.id != data.id));
    }
    function formatCurrency(number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(number);
    }
*/
    return (
        <TransactionsProvider>
            <DashboardHeader />
        </TransactionsProvider>
    );
};

export default Dashboard;
