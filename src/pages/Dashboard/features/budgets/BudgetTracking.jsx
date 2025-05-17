import ProgressBar from "@ramonak/react-progress-bar";
import {
    formatCurrency,
    roundDownPrice
} from "../../../../Utils/CustomMethods.js";
import Budget from "./Budget";
import { useAuth } from "../../../../contexts/AuthContext";
import { format, compareAsc } from "date-fns";

const BudgetTrackingChart = () => {
    const { transactions, budgets } = useAuth();
    console.log(budgets);
    const totalBudgetAmount = formatCurrency(
        budgets?.map(budget => budget.amount).reduce((acc, ini) => acc + ini, 0)
    );

    const trackingCategories = budgets?.map(budget => budget.category);

    const minmaxDate = budgets
        ?.flatMap(budget => [
            new Date(budget.start_date),
            new Date(budget.end_date)
        ])
        .sort(compareAsc)
        ?.map(date => format(date, "MMM, dd, yyyy"));

    return (
        <>
            <div>
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
            <div className="flex flex-col gap-2">
                {budgets?.map(budget => (
                    <Budget
                        budget={budget}
                        key={budget.id}
                        minmaxDate={minmaxDate}
                    />
                ))}
            </div>
        </>
    );
};

export default BudgetTrackingChart;
