import { createContext, useContext } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import { isFuture, isToday, isPast } from "date-fns";
import MenuCard from "../../ui/MenuCard";

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
    
    const { category, amount, notes, end_date, start_date } = budget;

    const totalSpent = roundDownPrice(
        expenses
            .filter(
                expense =>
                    expense.category === category &&
                    expense.date >= start_date &&
                    expense.date <= end_date
            )
            .map(expense => expense.amount)
    );

    const spentPercent = Math.trunc((totalSpent / amount) * 100);

    const remaining = amount - totalSpent;

    let isActive;

    const notStarted = isFuture(new Date(start_date));
    const haveStarted = isToday(new Date(start_date)) || isPast(start_date);
    const havePassed = isPast(new Date(end_date));
    const haveCompleted = totalSpent >= amount;

    if (notStarted) {
        isActive = "pending";
    }
    if (haveStarted) {
        isActive = "active";
    }
    if (havePassed) {
        isActive = "expired";
    }
    if (haveCompleted) {
        isActive = "fullfiled";
    }

    return (
        <BudgetContext.Provider
            value={{
                budget,
                notes,
                remaining,
                start_date,
                end_date,
                spentPercent,
                totalSpent,
                isActive,
                amount,
                category
            }}
        >
            <div className="p-2">{children}</div>
        </BudgetContext.Provider>
    );
}

const Infos = () => {
    const { category, notes, totalSpent, spentPercent, amount, remaining } =
        useBudgetContext();

    return (
        <div>
            <h1 className="text-xl font-bold capitalize">{category}</h1>
            <p>{notes}</p>
            <div className="py-2">
                <h1>Max: {formatCurrency(amount)}</h1>
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
    const { totalSpent, spentPercent, spendingLimit } = useBudgetContext();

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
    const { start_date, end_date } = useBudgetContext();

    return (
        <div className="pb-2">
            <p>From: {formatDate(start_date)}</p>
            <p>To: {formatDate(end_date)}</p>
        </div>
    );
};

const Action = () => {
    const { budget } = useBudgetContext();
    return (
        <MenuCard data={budget} type="budget">
            <MenuCard.Icon />
            <MenuCard.Options />
        </MenuCard>
    );
};
const Status = () => {
    const { isActive } = useBudgetContext();

    return (
        <h1
            className={`capitalize ring-1 ring-light-mainBackground
                    bg-light-sectionBackground
                    dark:ring-dark-mainBackground
                    dark:bg-dark-sectionBackground p-1
                rounded-md text-sm ${isActive === "expired" && "bg-red-300"}
                ${isActive === "active" && "bg-green-100 text-green-800"}`}
        >
            {isActive}
        </h1>
    );
};

Budget.Infos = Infos;
Budget.Progress = Progress;
Budget.Status = Status;
Budget.Duration = Duration;
Budget.Action = Action;

export default Budget;
