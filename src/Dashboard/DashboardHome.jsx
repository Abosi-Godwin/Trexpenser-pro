import { useEffect } from "react";
import toast from "react-hot-toast";
import { differenceInHours } from "date-fns";
import { getCurrentDate } from "./utils/currentDate";

import LineChart from "./features/Charts/LineChart";
import BarChart from "./features/Charts/BarChart";
import ApexLineChart from "./features/Charts/ApexLineChart";
import DoughnutChart from "./features/Charts/DoughnutChart";
import RecentTransactions from "./features/transactions/RecentTransactions";
import SavingGoals from "./features/savings/SavingGoals";
import BudgetTrackingChart from "./features/budgets/BudgetTracking";

import { useTransactions } from "./hooks/useTransactions";
import { useUser } from "./hooks/useUser";
import { useLoader } from "./hooks/useLoader";

const cardClass = `flex flex-col items-start justify-center bg-white 
  rounded-md p-3 gap-4 dark:bg-dark-cardBackground dark:text-dark-text`;

const DashboardHome = () => {
    const { userName, lastSeen } = useUser();
    const { somethingIsLoading } = useLoader();

    const {
        currentUserTransactions,
        incomes,
        expenses,
        totalIncome,
        totalExpenses,
        totalBalance
    } = useTransactions();

    useEffect(() => {
        const hoursAgo = differenceInHours(getCurrentDate(), lastSeen) >= 12;
        if (userName && !somethingIsLoading && hoursAgo) {
            toast.success(`Welcome back, ${userName}!`);
        }
    }, [userName, lastSeen, somethingIsLoading]);

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Balance + ApexChart */}
            <div className={`${cardClass} bg-light-cardBackground`}>
                <div className="flex items-center justify-between w-full">
                    <div>
                        <p className="text-3xl font-bold text-gray-700 dark:text-dark-text">
                            {totalBalance}
                        </p>
                        <p className="text-sm">Income and expenses overview</p>
                    </div>
                </div>
                <ApexLineChart incomes={incomes} expenses={expenses} />
            </div>

            {/* Income + LineChart */}
            <div className={cardClass}>
                <div className="flex flex-col p-3 rounded-md">
                    <p className="text-3xl font-bold text-gray-700 dark:text-dark-text">
                        {totalIncome}
                    </p>
                    <p className="text-sm">Incomes overview</p>
                </div>
                <LineChart
                    allDatas={currentUserTransactions}
                    incomes={incomes}
                    expenses={expenses}
                    label="Income"
                />
            </div>

            {/* Expenses + LineChart */}
            <div className={cardClass}>
                <div className="flex flex-col">
                    <p className="text-3xl font-bold text-gray-700 dark:text-dark-text">
                        {totalExpenses}
                    </p>
                    <p className="text-sm">Expenses overview</p>
                </div>
                <LineChart
                    allDatas={currentUserTransactions}
                    incomes={incomes}
                    expenses={expenses}
                    label="Expenses"
                />
            </div>

            {/* Bar chart */}
            <div className={cardClass}>
                <BarChart
                    allDatas={currentUserTransactions}
                    showTitle={false}
                    type="x"
                />
            </div>

            {/* Doughnut — income */}
            <div className={cardClass}>
                <DoughnutChart
                    allDatas={currentUserTransactions}
                    label="income"
                />
            </div>

            {/* Doughnut — expense */}
            <div className={cardClass}>
                <DoughnutChart
                    allDatas={currentUserTransactions}
                    label="expense"
                />
            </div>

            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <RecentTransactions />
                </div>
                <SavingGoals showTitle={true} />
                <BudgetTrackingChart />
            </div>
        </section>
    );
};

export default DashboardHome;
