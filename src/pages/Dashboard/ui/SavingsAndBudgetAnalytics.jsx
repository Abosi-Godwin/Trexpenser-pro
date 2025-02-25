import BarChart from "./BarChart";
import BudgetTrackingChart from "../features/budgets//BudgetTracking.jsx";
import { useTransactions } from "../../../contexts/TransactionsContext.jsx";
import { formatCurrency, roundDownPrice } from "../../../Utils/CustomMethods.js";

const SavingsAndBudgetAnalytics = () => {
    const { savingsGoals, transactions } = useTransactions();

    return (
        <div
            className="overflow-hidden rounded-md shadow-md
                    shadow-color-2 w-full p-4 bg-white md:w-full md:max-w-[40%]
                     grid grid-cols-1 gap-5"
        >
            <div className="border border-color-2 p-2 pt-5 rounded-md">
                <div className="mb-4">
                    <h1 className="text-xl font-extrabold text-gray-700">
                        Savings Performance
                    </h1>
                    <h1 className="text-xs capitalize">
                        <span className="font-bold text-color-8">
                            {formatCurrency(
                                roundDownPrice(
                                    savingsGoals.map(
                                        savings => savings.currentAmount
                                    )
                                )
                            )}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-color-8">
                            {formatCurrency(
                                roundDownPrice(
                                    savingsGoals.map(
                                        savings => savings.targetAmount
                                    )
                                )
                            )}
                        </span>{" "}
                        saved.
                    </h1>
                </div>

                <BarChart showTitle={true} type="y" mode="income" />
            </div>

            <div className="border border-color-2 p-2 pt-5 rounded-md">
                <BudgetTrackingChart />
            </div>
        </div>
    );
};

export default SavingsAndBudgetAnalytics;
