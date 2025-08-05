/*
import { useState, useEffect } from "react";
import Budget from "./Utilities/Budget.jsx";
import EditBudgetForm from "./Utilities/EditBudgetForm.jsx";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from "./Utilities/Modal.jsx";

function BudgetPlanning({ expensesArray, budgets, onCurrencyFormat }) {
    const allBudgets = budgets;
    const [budgetToEdit, setBudgetToEdit] = useState();
    const [allExpenses, setAllExpenses] = useState(
        expensesArray.filter(expense => expense.type === "expense")
    );

    const trackingCategory = allBudgets.map(budget => budget.category);

    const startDate = allBudgets
        .map(budget => budget.startDate)
        .sort((a, b) => a + b)[0];

    const endDate = allBudgets
        .map(budget => budget.endDate)
        .sort((a, b) => a + b)
        .reverse()[0];

    const [spendingLimit, setSpendingLimit] = useState(() =>
        allBudgets.map(budget => budget.amount).reduce((acc, ini) => acc + ini)
    );

    const [totalSpent, setTotalSpent] = useState(
        allExpenses
            .filter(
                budget => budget.date >= startDate && budget.date <= endDate
            )
            .filter(data => trackingCategory.includes(data.category))
            .map(data => data.amount)
            .reduce((acc, ini) => acc + ini, 0)
    );

    const [spentPercent, setSpentPercent] = useState(
        (totalSpent / spendingLimit) * 100
    );

    const budgetCategories = [
        ...new Set(allExpenses.map(expense => expense.category))
    ];

    function handleOpenBudgetEditForm(data) {
        setBudgetToEdit(data);
    }
    function handleOpenBudgetDelForm() {
        console.log(6);
    }
    useEffect(() => {
        const newSpendingLimit = allBudgets
            .map(budget => budget.amount)
            .reduce((acc, ini) => acc + ini, 0);
        setSpendingLimit(newSpendingLimit);
    }, [allBudgets]);

    useEffect(() => {
        const newExpenses = expensesArray.filter(
            expense => expense.type === "expense"
        );
        setAllExpenses(newExpenses);
    }, [expensesArray]);

    useEffect(() => {
        const newTotalSpent = allExpenses
            .filter(
                budget => budget.date >= startDate && budget.date <= endDate
            )
            .filter(data => trackingCategory.includes(data.category))
            .map(data => data.amount)
            .reduce((acc, ini) => acc + ini, 0);
        setTotalSpent(newTotalSpent);
    }, [allExpenses]);

    useEffect(() => {
        if (spendingLimit > 0) {
            setSpentPercent((totalSpent / spendingLimit) * 100);
        }
    }, [totalSpent, spendingLimit]);

    return (
        <div className=" w-screen bg-color-9">
            <div className="w-full py-6 px-2">
                <h2 className="uppercase text-4xl font-bold">
                    Budget {<br />} Planning
                </h2>
            </div>
            {budgetToEdit && (
                <Modal>
                    <EditBudgetForm
                        data={budgetToEdit}
                        budgetCategories={budgetCategories}
                        allBudgets={allBudgets}
                        onFormClose={() => {}}
                        onFormSubmit={() => {}}
                    />
                </Modal>
            )}
            <div className="w-full">
                <div className="flex justify-between items-center gap-2 p-2">
                    <h2
                        className="uppercase text-xl font-bold capitalize
                        text-color-3 w-4/5"
                    >
                        current budget summary
                    </h2>
                </div>
                <div className="flex items-center justify-center w-full pf-3">
                    <div className="h-0.5 w-full bg-color-3 rounded-md"></div>
                </div>
                <div className="flex items-center justify-center p-4">
                    <div className="bg-color-3 p-4 rounded w-full">
                        <h3 className="text-xl font-bold text-color-7">
                            Spending limit: {onCurrencyFormat(spendingLimit)}
                        </h3>
                        <h1 className="text-xl font-bold text-color-7">
                            Spending status: {Math.trunc(spentPercent)}%
                        </h1>
                        <div className="py-2">
                            <ProgressBar
                                completed={totalSpent}
                                maxCompleted={spendingLimit}
                                customLabel={
                                    spentPercent < 40
                                        ? spentPercent + "%"
                                        : spentPercent >= 40 &&
                                          spentPercent <= 80
                                        ? "Not there yet..."
                                        : "Watch your spending..."
                                }
                                bgColor="#7c74e0"
                                baseBgColor="#f0f2fd"
                            />
                        </div>

                        <div className="pt-4">
                            <h1 className="text-color-7 font-bold text-xl">
                                Active expenses tracking
                            </h1>{" "}
                            <div>
                                <div>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {allBudgets.map(budget => {
                                            return (
                                                <Budget
                                                    budget={budget}
                                                    expenses={allExpenses}
                                                    key={budget.Id}
                                                    onCurrencyFormat={
                                                        onCurrencyFormat
                                                    }
                                                    onFormEditOpen={
                                                        handleOpenBudgetEditForm
                                                    }
                                                    onFormDeleteOpen={
                                                        handleOpenBudgetDelForm
                                                    }
                                                />
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div
                                    className="flex alig-center justify-between
                                py-4 md:justify-center md:gap-10"
                                >
                                    <button
                                        className="bg-color-5 text-color-2
                                  font-bold rounded-md p-4 text-xl uppercase"
                                    >
                                        View all
                                    </button>
                                    <button
                                        className="bg-color-8 text-color-2
                                  font-bold rounded-md p-4 text-xl uppercase"
                                    >
                                        Add new
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
*/
//export default BudgetPlanning;
