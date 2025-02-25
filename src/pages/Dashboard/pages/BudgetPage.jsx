/*import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Budget from "./Utilities/Budget.jsx";
import BudgetForm from "./Utilities/BudgetForm.jsx";
import EditBudgetForm from "./Utilities/EditBudgetForm.jsx";
import DeleteBudgetForm from "./Utilities/DeleteBudgetForm.jsx";
import ProgressBar from "@ramonak/react-progress-bar";

function BudgetPlanning({ expenesArray, budgets, onCurrencyFormat }) {
     const [allExpenses, setAllExpenses] = useState(
        expenesArray.filter(expense => expense.type === "expense")
    );

    const [allBudgets, setAllBudgets] = useState(budgets);

    const [trackingCategory, setTrackingCategory] = useState(
        allBudgets.map(budget => budget.category)
    );

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

    const [budgeTotEdit, setBudgetToEdit] = useState();
    const [budgetToDelete, setBudgetToDelete] = useState();
    const handleBudgetData = budgetData => {
        setAllBudgets([...allBudgets, budgetData]);
    };

    const budgetCategories = [
        ...new Set(allExpenses.map(expense => expense.category))
    ];
    const [openForm, setOpenForm] = useState(false);

    function handleOpenForm() {
        setOpenForm(value => !value);
    }
    function handleOpenBudgetEditForm(data) {
        setBudgetToEdit(data);
    }
    function handleOpenBudgetDelForm(data) {
        setBudgetToDelete(data);
    }
    function handleBudgetEditClose() {
        setBudgetToEdit("");
    }
    function handleBudgetDataEdit(data) {
        console.log(data);
    }
    function handleBudgetDelClose() {
        setBudgetToDelete("");
    }
    function handleBudgetDelete(data) {
        console.log(data);
        setBudgetToDelete("");
    }
    useEffect(() => {
        const newSpendingLimit = allBudgets
            .map(budget => budget.amount)
            .reduce((acc, ini) => acc + ini, 0);
        setSpendingLimit(newSpendingLimit);
    }, [allBudgets]);

    useEffect(() => {
        const newExpenses = expenesArray.filter(
            expense => expense.type === "expense"
        );
        setAllExpenses(newExpenses);
    }, [expenesArray]);

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

    return {
        <div className="py-6 px-2 w-screen bg-color-9">
            <div className="w-full">
                <h2 className="uppercase text-4xl font-bold text-color-7">
                    Budget {<br />} Planning
                </h2>
            </div>
            {budgeTotEdit && (
                <EditBudgetForm
                    data={budgeTotEdit}
                    allBudgets={budgets}
                    budgetCategories={budgetCategories}
                    onFormClose={handleBudgetEditClose}
                    onFormSubmit={handleBudgetDataEdit}
                />
            )}
            {budgetToDelete && (
                <DeleteBudgetForm
                    data={budgetToDelete}
                    onFormClose={handleBudgetDelClose}
                    onFormDelete={handleBudgetDelete}
                    onCurrencyFormat={onCurrencyFormat}
                />
            )}
            <div className="w-full">
                <div className="flex justify-between items-center gap-2">
                    <h2
                        className="uppercase text-xl font-bold capitalize
                        text-color-3 w-4/5"
                    >
                        current budget summary
                    </h2>
                    {openForm ? (
                        <button
                            className="flex items-center justify-center gap-1 p-2 bg-color-3 uppercase rounded text-color-8
        hover:bg-color-6 hover:text-color-2 font-extrabold"
                            onClick={handleOpenForm}
                        >
                            {" "}
                            close
                            <FaTimes />
                        </button>
                    ) : (
                        <button
                            className="flex items-center justify-center gap-1 p-2 bg-color-3 uppercase rounded text-color-8
        hover:bg-color-6 hover:text-color-2 font-extrabold"
                            onClick={handleOpenForm}
                        >
                            open
                            <FaPlus />
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-center w-full py-3">
                    <div className="h-0.5 w-full bg-color-3 rounded-md"></div>
                </div>
                <div
                    className="flex items-center justify-center py-4 grid
                md:grid-cols-2 gap-4 w-full"
                >
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
                                    <ul className="flex flex-col gap-4">
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
                            </div>
                        </div>
                    </div>

                    {openForm && (
                        <BudgetForm
                            budgetCategories={budgetCategories}
                            allBudgets={allBudgets}
                            onFormSubmit={handleBudgetData}
                        />
                    )}
                </div>
            </div>
        </div>
    };
}*/
const BudgetPlanning = () => {
    return <h1>Hello world 🌎 and I have </h1>;
};
export default BudgetPlanning;
