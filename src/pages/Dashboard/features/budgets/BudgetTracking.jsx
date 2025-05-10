//import { useMemo } from "react";

import ProgressBar from "@ramonak/react-progress-bar";
import {
    formatCurrency,
    roundDownPrice
} from "../../../../Utils/CustomMethods.js";
import { useTransactions } from "../../Contexts/TransactionsContext";
import { format, compareAsc } from "date-fns";

const BudgetTrackingChart = () => {
    const { transactions, budgets } = useTransactions();

    const totalBudgetAmount = formatCurrency(
        budgets.map(budget => budget.amount).reduce((acc, ini) => acc + ini, 0)
    );

    const trackingCategories = budgets.map(budget => budget.category);

    const minmaxDate = budgets
        .flatMap(budget => [
            new Date(budget.startDate),
            new Date(budget.endDate)
        ])
        .sort(compareAsc)
        .map(date => format(date, "MMM, dd, yyyy"));

    return (
        <>
            <div>
                <h1 className="text-xl font-extrabold">Budget Analytics</h1>
                <p className="text-xs capitalize mb-4">
                    Track your spending flow.
                </p>
                <p className="bg-color-1 rounded-md p-2 my-1">
                    Maximum of <strong>{totalBudgetAmount}</strong> in both{" "}
                    {...trackingCategories.join(" and ")} dated from
                    {" " + minmaxDate[0]} to
                    {" " + minmaxDate[minmaxDate.length - 1]}.
                </p>
            </div>
            <div className="flex flex-col gap-2">
                {budgets.map(budget => (
                    <BudgetRoll
                        budget={budget}
                        key={budget.Id}
                        transactions={transactions}
                        minmaxDate={minmaxDate}
                    />
                ))}
            </div>
        </>
    );
};

const BudgetRoll = ({ budget, transactions, minmaxDate }) => {
    const getTotalSpent = (category, transactions) =>
        transactions
            .filter(data => data.category === category)
            .filter(
                data =>
                    format(data.date, "MMM, dd, yyyy") >=
                    format(new Date(minmaxDate[0]), "MMM, dd, yyyy")
            )
            .map(data => data.amount);

    const limitAmount = budget.amount;
    const spentAmount = roundDownPrice(
        getTotalSpent(budget.category, transactions)
    );

    return (
        <div className="bg-color-8 text-color-1 p-2 rounded-md">
            <h1 className="text-md text-color-1 font-bold uppercase my-1">
                {budget.category}
            </h1>
            <p>
                <strong>Limit:</strong>
                {" " + formatCurrency(limitAmount)}
            </p>
            <p>
                <strong>Spent:</strong>
                {" " + formatCurrency(spentAmount)}
            </p>
            <p className="text-sm">
                <strong>Duration:</strong>
                {` ${format(budget.startDate, "MMM, dd, yyyy")} - ${format(
                    budget.endDate,
                    "MMM, dd, yyyy"
                )}`}
            </p>
            <ProgressBar
                completed={+spentAmount}
                maxCompleted={+limitAmount}
                bgColor="#7c74e0"
                baseBgColor="#e4e7fb"
                height={15}
                margin="5px 0"
            />
        </div>
    );
};

export default BudgetTrackingChart;
