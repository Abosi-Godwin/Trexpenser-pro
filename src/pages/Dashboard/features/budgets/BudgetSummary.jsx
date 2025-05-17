import { useState } from "react";

import { useAuth } from "../../../../contexts/AuthContext";
import { formatCurrency } from "../../../../Utils/CustomMethods";
import ProgressBar from "@ramonak/react-progress-bar";

const BudgetSummary = () => {
    const { transactions, budgets } = useAuth();

    const expenes = transactions.filter(
        transaction => transaction.type === "expense"
    );

    const categories = [...new Set(budgets.map(budget => budget.category))];

    const startDate = budgets
        .map(budget => budget.start_date)
        .sort((a, b) => new Date(a) - new Date(b))[0];

    const endDate = budgets
        .map(budget => budget.end_date)
        .sort((a, b) => new Date(a) - new Date(b))
        .reverse()[0];

    const [spendingLimit, setSpendingLimit] = useState(() =>
        budgets.map(budget => budget.amount).reduce((acc, ini) => acc + ini)
    );

    const [totalSpent, setTotalSpent] = useState(
        expenes
            .filter(
                expense => expense.date >= startDate && expense.date <= endDate
            )
            .filter(expense => categories.includes(expense.category))
            .map(expense => expense.amount)
            .reduce((acc, ini) => acc + ini, 0)
    );
    console.log(totalSpent);

    const spentPercent = (totalSpent / spendingLimit) * 100;
    console.log(spentPercent);

    return (
        <>
            <div className="w-full">
                <h2 className="uppercase text-2xl font-bold">
                    Budget {<br />} Planning
                </h2>
            </div>

            <div className="flex items-center justify-center w-full py-3">
                <div
                    className="h-0.5 w-full rounded-md
                bg-light-sectionBackground"
                ></div>
            </div>
            <div className="flejustify-start justify-center flex-col">
                <h1 className="font-bold">
                    Spending limit: {formatCurrency(spendingLimit)}
                </h1>
                <h1 className="font-bold">
                    Amount spent: {formatCurrency(totalSpent)}
                </h1>
                <h1 className="font-bold">
                    Spending status: {Math.trunc(spentPercent)}%
                </h1>

                <ProgressBar
                    completed={totalSpent}
                    maxCompleted={spendingLimit}
                    customLabel={
                        spentPercent < 40
                            ? spentPercent + "%"
                            : spentPercent >= 40 && spentPercent <= 80
                            ? "Not there yet..."
                            : "Watch your spending..."
                    }
                    bgColor="#7c74e0"
                    baseBgColor="#f0f2fd"
                />
            </div>
        </>
    );
};

export default BudgetSummary;
/*


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


*/
