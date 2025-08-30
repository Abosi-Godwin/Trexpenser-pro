import { useCallback } from "react";

import Budget from "./Budget";
import Budgets from "./Budgets";

import { useBudgets } from "../../Hooks/useBudgets";
import { formatCurrency } from "../../Utils/formatCurrency";

const BudgetTrackingChart = () => {
    const { budgets, spendingLimit, categories, minMaxDate } = useBudgets();

    const getCategories = useCallback(
        categories => {
            const last = categories.pop();

            return ` ${categories?.join(", ")} and ${last} `;
        },
        [categories]
    );

    return (
        <div
            className="bg-light-cardBackground rounded-md p-2
        dark:bg-dark-cardBackground dark:text-dark-text"
        >
            <div className="border-b-2 border-b-light-divider">
                <h1 className="text-xl font-extrabold">Budget Analytics</h1>
                <p className="text-xs capitalize mb-2">
                    Track your spending flow.
                </p>

                <p className="whitespace-break-spaces">
                    Maximum of <strong>{formatCurrency(spendingLimit)}</strong>{" "}
                    in{" "}
                    {categories?.length > 2
                        ? getCategories(categories)
                        : " the " + categories.join(" and ") + " category "}
                    dated from {minMaxDate?.[0]} to {minMaxDate?.[1]}
                </p>
            </div>
            <Budgets showAction={false} />
        </div>
    );
};

export default BudgetTrackingChart;
