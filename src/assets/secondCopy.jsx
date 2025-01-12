import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import AddExpense from "./components/AddExpense.jsx";
/*
import Expenses from "./components/ExpenseItems.jsx";
import Summary from "./components/Summary.jsx";
import BudgetPlanning from "./components/BudgetPlanning.jsx";
import SavingGoals from "./components/SavingGoals.jsx";
import Footer from "./components/Footer.jsx";
*/
import { datas } from "./assets/data/data.js";

// import expenesArray from "./assets/data/DoughnutDatas.js";
import "./App.css";

function App() {
    const [expenses, setExpenses] = useState(datas);

    function handleAddExpenses(expenseObj) {
        setExpenses([...expenses, expenseObj]);
    }

    /* function handleDataEditted(data) {
        setExpenses(formalExpenses =>
            expenses.map(item => {
                return item.id === data.id ? { ...data } : item;
            })
        );
    }

    function handleDataDeleted(data) {
        setExpenses(formalExpense =>
            expenses.filter(item => item.id != data.id)
        );
    }
    */
    function formatCurrency(number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(number);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="header"
                    element={
                        <Header
                            expenses={expenses}
                            currencyFormater={formatCurrency}
                        />
                    }
                />
                <Route
                    path="form"
                    element={
  <AddExpense expenses={expenses} onFormSubmit={handleAddExpenses} />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
// <>
/*
            <Header expenses={expenses} currencyFormater={formatCurrency} />
            <AddExpense expenses={expenses} onFormSubmit={handleAddExpenses} />
            <Expenses
                expenseItems={[...expenses]}
                onCurrencyFormat={formatCurrency}
                onDataEdited={handleDataEditted}
                onDataDeleted={handleDataDeleted}
            />
            <Summary
                datas={expenses}
                doughnutDatas={expenesArray}
                onCurrencyFormat={formatCurrency}
            />
            <BudgetPlanning
                expensesArray={expenses}
                budgets={budgets}
                onCurrencyFormat={formatCurrency}
            />
            <SavingGoals savings={savingsGoals} />
            <Footer />
        </>*/
