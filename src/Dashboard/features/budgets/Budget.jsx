import { createContext, useContext } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { isFuture } from "date-fns";

import { RecentItemMenuCard } from "../../ui/RecentItemMenu";

import { useTransactions } from "../../Hooks/useTransactions";

import { formatCurrency } from "../../Utils/formatCurrency";
import { formatDate } from "../../Utils/formatDate";
import { roundDownPrice } from "../../Utils/CustomMethods";
const BudgetContext = createContext();

const useBudgetContext = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error(
            "useBudgetContext must be used within a <Budget /> provider"
        );
    }

    return context;
};

function Budget({ budget, children }) {
    const { expenses } = useTransactions();

    const startDate = budget.start_date;
    const endDate = budget.end_date;
    const notes = budget.notes;
    const spendingLimit = budget.amount;
    const trackingCategory = budget.category;

    const totalSpent = roundDownPrice(
        expenses
            .filter(
                expense =>
                    expense.category === trackingCategory &&
                    expense.date >= startDate &&
                    expense.date <= endDate
            )
            .map(expense => expense.amount)
    );

    const spentPercent = Math.trunc((totalSpent / spendingLimit) * 100);

    const remaining = budget.amount - totalSpent;
    const isActive = isFuture(endDate) && totalSpent < spendingLimit;

    return (
        <BudgetContext.Provider
            value={{
                notes,
                remaining,
                startDate,
                endDate,
                spentPercent,
                totalSpent,
                isActive,
                spendingLimit,
                trackingCategory
            }}
        >
            <div className="p-2">{children}</div>
        </BudgetContext.Provider>
    );
}

const Infos = () => {
    const {
        trackingCategory,
        notes,
        totalSpent,
        spentPercent,
        spendingLimit,
        remaining
    } = useBudgetContext();

    return (
        <div>
            <h1 className="text-xl font-bold">{trackingCategory}</h1>
            <p>{notes}</p>
            <div className="py-2">
                <h1>Max: {formatCurrency(spendingLimit)}</h1>
                <h1>Spent: {formatCurrency(totalSpent)}</h1>
                <h1>
                    {spentPercent <= 100 ? "Remaining" : "Over spent"}:{" "}
                    {formatCurrency(remaining)}
                </h1>
            </div>
        </div>
    );
};

const Progress = () => {
    const { totalSpent, spentPercent, spendingLimit, spent } =
        useBudgetContext();

    return (
        <ProgressBar
            completed={totalSpent}
            maxCompleted={spendingLimit}
            bgColor="#9190e9"
            baseBgColor="#f0f2fd"
            customLabel={`${Math.min(100, Math.trunc(spentPercent))}%`}
            height={10}
            labelSize={10}
        />
    );
};

const Duration = () => {
    const { startDate, endDate } = useBudgetContext();

    return (
        <div className="pb-2">
            <p>From: {formatDate(startDate)}</p>
            <p>To: {formatDate(endDate)}</p>
        </div>
    );
};

const Action = () => {
    return <RecentItemMenuCard />;
};
const Status = () => {
    const { isActive } = useBudgetContext();

    return (
        <h1
            className={`p-1 rounded-md flex items-center justify-center ${
                isActive
                    ? "text-green-500 bg-green-50"
                    : "text-red-500 bg-red-50"
            }`}
        >
            {isActive ? "Active" : "Expired"}
        </h1>
    );
};

Budget.Infos = Infos;
Budget.Progress = Progress;
Budget.Status = Status;
Budget.Duration = Duration;
Budget.Action = Action;

export default Budget;
