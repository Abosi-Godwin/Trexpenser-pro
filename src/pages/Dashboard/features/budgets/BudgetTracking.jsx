import {
    formatCurrency,
    roundDownPrice
} from "../../../../Utils/CustomMethods.js";
import Budget from "./Budget";
import { useAuth } from "../../../../contexts/AuthContext";
import { format, compareAsc } from "date-fns";

const BudgetTrackingChart = () => {
    const { budgets } = useAuth();
/*
    const totalBudgetAmount = formatCurrency(
        roundDownPrice(budgets?.map(budget => budget.amount))
    );

    const trackingCategories = budgets?.map(budget => budget.category);

    const minmaxDate = budgets
        ?.flatMap(budget => [
            new Date(budget.start_date),
            new Date(budget.end_date)
        ])
        .sort(compareAsc)
        .map(date => format(date, "MMM, dd, yyyy"));
*/
    return (
        <>
            {/* <div>
                <h1 className="text-xl font-extrabold">Budget Analytics</h1>
                <p className="text-xs capitalize mb-4">
                    Track your spending flow.
                </p>
                <p className="rounded-md p-2 my-1">
                    Maximum of <strong>{totalBudgetAmount}</strong> in both{" "}
                    {...trackingCategories?.join(", ")} dated from
                    {" " + minmaxDate[0]} to
                    {" " + minmaxDate[minmaxDate.length - 1]}.
                </p>
            </div>
            <ul
                className="flex flex-col gap-2  border-y-2 divide-y-2
   divide-light-divider
            "
            >
                {budgets.map(budget => (
                    <Budget
                        budget={budget}
                        key={budget.id}
                        minmaxDate={minmaxDate}
                    />
                ))}
            </ul>
        */}
            <h1>Tracker</h1>
        </>
    );
};

export default BudgetTrackingChart;
