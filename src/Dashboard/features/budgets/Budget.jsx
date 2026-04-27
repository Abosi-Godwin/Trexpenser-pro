import { createContext, useContext, useRef } from "react";
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
    const isOverSpent = totalSpent > amount;

    let isActive;
    if (isFuture(new Date(start_date))) isActive = "pending";
    if (isToday(new Date(start_date)) || isPast(new Date(start_date)))
        isActive = "active";
    if (isPast(new Date(end_date))) isActive = "expired";
    if (totalSpent >= amount) isActive = "fulfilled";

    const portalRef = useRef(null);

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
                isOverSpent,
                amount,
                category,
                portalRef
            }}
        >
            <div className="p-2">{children}</div>
        </BudgetContext.Provider>
    );
}

const Infos = () => {
    const {
        category,
        notes,
        totalSpent,
        amount,
        remaining,
        isOverSpent
    } = useBudgetContext();

    return (
        <div>
            <div className="pb-5">
                <p className="text-xl font-bold capitalize">{category}</p>
                <p className="font-bold">{formatCurrency(amount)}</p>
            </div>

            {notes && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {notes}
                </p>
            )}

            <div className="py-2 space-y-1">
                <p>Spent: {formatCurrency(totalSpent)}</p>
                <p className={isOverSpent ? "text-red-500 font-semibold" : ""}>
                    {isOverSpent ? "Overspent" : "Remaining"}:{" "}
                    {formatCurrency(Math.abs(remaining))}
                </p>
            </div>
        </div>
    );
};

const Progress = () => {
    const { totalSpent, spentPercent, amount } = useBudgetContext();

    return (
        <ProgressBar
            completed={totalSpent}
            maxCompleted={amount}
            bgColor={spentPercent >= 100 ? "#ef4444" : "#9190e9"}
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
        <div className="pb-2 text-sm space-y-1">
            <p>From: {formatDate(start_date)}</p>
            <p>To: {formatDate(end_date)}</p>
        </div>
    );
};

const Action = () => {
    const { budget, portalRef } = useBudgetContext();

    return (
        <div ref={portalRef}>
            <MenuCard data={budget} type="budget" portalRef={portalRef}>
                <MenuCard.Toggle id={budget.id} />
                <MenuCard.Options id={budget.id} />
            </MenuCard>
        </div>
    );
};

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 ring-yellow-200",
    active: "bg-green-100 text-green-800 ring-green-200",
    expired: "bg-red-100 text-red-800 ring-red-200",
    fulfilled: "bg-indigo-100 text-indigo-800 ring-indigo-200"
};

const Status = () => {
    const { isActive } = useBudgetContext();

    return (
        <p
            className={`capitalize ring-1 p-1 rounded-md text-sm w-fit
        ${statusStyles[isActive] ?? "bg-light-sectionBackground ring-light-mainBackground"}`}
        >
            {isActive}
        </p>
    );
};

Budget.Infos = Infos;
Budget.Progress = Progress;
Budget.Status = Status;
Budget.Duration = Duration;
Budget.Action = Action;

export default Budget;
