import { createContext, useContext } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { isFuture } from "date-fns";

import { RecentItemMenuCard } from "../../ui/RecentItemMenu";

import { useTransactions } from "../../Hooks/useTransactions";

import { formatCurrency } from "../../Utils/formatCurrency";
import { formatDate } from "../../Utils/formatDate";

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
    return (
        <BudgetContext.Provider value={{ budget }}>
            <div className="p-2">{children}</div>
        </BudgetContext.Provider>
    );
}

const Infos = () => {
    const { budget } = useBudgetContext();
    const { expenses } = useTransactions();

    const spent = expenses
        .filter(
            expense =>
                expense.category === budget.category &&
                new Date(expense.date) >= new Date(budget.start_date) &&
                new Date(expense.date) <= new Date(budget.end_date)
        )
        .map(expense => expense.amount)
        .reduce((a, b) => a + b, 0);
    const remaining = budget.amount - spent;

    const spentPercent = Math.trunc((spent / budget.amount) * 100);

    return (
        <div>
            <h1 className="text-xl font-bold">{budget.category}</h1>
            <p>{budget.notes}</p>
            <div className="py-2">
                <h1>Max: {formatCurrency(budget.amount)}</h1>
                <h1>Spent: {formatCurrency(spent)}</h1>
                <h1>
                    {spentPercent <= 100 ? "Remaining" : "Over spent"}:{" "}
                    {formatCurrency(remaining)}
                </h1>
            </div>
             
        </div>
    );
};

const Progress = () => {
    const { expenses } = useTransactions();
    const { budget } = useBudgetContext();

    const startDate = budget.start_date;
    const endDate = budget.end_date;
    const trackingCategory = budget.category;

    const allExpenses = expenses.filter(
        expense => expense.category === budget.category
    );

    const spendingLimit = budget.amount;

    const totalSpent = allExpenses
        .filter(
            expense =>
                expense.category === trackingCategory &&
                expense.date >= startDate &&
                expense.date <= endDate
        )
        .reduce((acc, ini) => acc + ini.amount, 0);

    const spentPercent = (totalSpent / spendingLimit) * 100;

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
    const { budget } = useBudgetContext();

    const startDate = budget.start_date;
    const endDate = budget.end_date;

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
    const { budget } = useBudgetContext();
    const endDate = new Date(budget.end_date);
    const isActive = isFuture(endDate);

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
