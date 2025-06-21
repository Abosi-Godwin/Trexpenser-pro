import Budget from "./Budget";
import Budgets from "./Budgets";

import { useBudgetsData } from "../../Hooks/useBudgetsData";
import { formatCurrency } from "../../Utils/formatCurrency";

const BudgetTrackingChart = () => {
    const { budgets, totalBudgetAmount, categories, minMaxDate } =
        useBudgetsData();

    const getCategories = categories => {
        if (categories?.length === 2) {
            return `${categories[0]} and ${categories[1]}`;
        }

        const last = categories.pop();

        return ` ${categories?.join(", ")} and ${last} `;
    };
    return (
        <div className="bg-light-cardBackground rounded-md p-2">
            <div className="border-b-2 border-b-light-divider">
                <h1 className="text-xl font-extrabold">
                    Budget Analytics
                </h1>
                <p className="text-xs capitalize mb-2">
                    Track your spending flow.
                </p>
                <p className="sm whitespace-break-spaces">
                    Maximum of{" "}
                    <strong>{formatCurrency(totalBudgetAmount)}</strong> in
                    {categories?.length > 2
                        ? getCategories(categories)
                        : " " + categories + " category "}
                    dated from {minMaxDate?.[0]} to {minMaxDate?.[1]}
                </p>
            </div>
            <Budgets />
        </div>
    );
};

export default BudgetTrackingChart;
