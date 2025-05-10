import BarChart from "./BarChart";
import BudgetTrackingChart from "../features/budgets//BudgetTracking";
import SavingGoals from "../features/savings/SavingGoals";
const SavingsAndBudgetAnalytics = () => {
    return (
        <div
            className="overflow-hidden rounded-md shadow-md
                    shadow-color-2 w-full p-4 bg-white md:w-full md:max-w-[40%]
                     grid grid-cols-1 gap-5  dark:bg-dark-cardBackground dark:text-dark-text"
        >
            <div className="border border-color-2 p-2 pt-5 rounded-md">
                <SavingGoals showTitle={true} />
            </div>

            <div className="border border-color-2 p-2 pt-5 rounded-md">
                <BudgetTrackingChart />
            </div>
        </div>
    );
};

export default SavingsAndBudgetAnalytics;

/*
import BarChart from "./BarChart";
import BudgetTrackingChart from "../features/budgets//BudgetTracking";

const SavingsAndBudgetAnalytics = ({ allDatas }) => {
    return (
        <div
            className="overflow-hidden rounded-md shadow-md
                    shadow-color-2 w-full p-4 bg-white md:w-full md:max-w-[40%]
                     grid grid-cols-1 gap-5  dark:bg-dark-cardBackground dark:text-dark-text"
        >
            <div className="border border-color-2 p-2 pt-5 rounded-md">
                <BarChart
                    allDatas={allDatas}
                    showTitle={true}
                    type="y"
                    mode="income"
                />
            </div>

            <div className="border border-color-2 p-2 pt-5 rounded-md">
                <BudgetTrackingChart />
            </div>
        </div>
    );
};

export default SavingsAndBudgetAnalytics;




*/
