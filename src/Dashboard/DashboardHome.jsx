import { useEffect } from "react";
import toast from "react-hot-toast";

import LineChart from "./features/Charts/LineChart";
import BarChart from "./features/Charts/BarChart";
import ApexLineChart from "./features/Charts/ApexLineChart";
import DoughnutChart from "./features/Charts/DoughnutChart";
import RecentTransactions from "./features/transactions/RecentTransactions";

import SavingGoals from "./features/savings/SavingGoals";
import BudgetTrackingChart from "./features/budgets/BudgetTracking";
import EmptyDashboard from "./ui/EmptyDashboard";

import { useTransactions } from "./Hooks/useTransactions";
import { useUser } from "./Hooks/useUser";
import { useLoader } from "./Hooks/useLoader";

const DashboardHome = () => {
    const { user } = useUser();
    const somethingIsLoading = useLoader();

    const {
        currentUserTransactions,
        hasFetchedTransactions,
        isEmpty,
        incomes,
        expenses,
        totalIncome,
        totalExpenses,
        totalBalance
    } = useTransactions();

    const userName = user?.user_metadata?.userName;

    useEffect(() => {
        if (userName && !somethingIsLoading) {
            toast.success(`Welcome, ${userName}`);
        }
    }, [userName, somethingIsLoading]);
     if (currentUserTransactions?.length === 0) {
        return <EmptyDashboard />;
    }
    return (
        <>
            {somethingIsLoading && hasFetchedTransactions && isEmpty ? (
                <EmptyDashboard />
            ) : (
                <section
                    className="grid grid-cols-1 md:grid-cols-3 gap-4
                    overflow-scroll"
                >
                    <div
                        className="flex flex-col items-start justify-center bg-light-cardBackground rounded-md p-3 gap-4
            dark:bg-dark-cardBackground dark:text-dark-text overflow-auto"
                    >
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <h1
                                    className="text-3xl font-bold text-gray-700
                        dark:text-dark-text"
                                >
                                    {totalBalance}
                                </h1>
                                <p className="text-sm">
                                    Income and expenses overview
                                </p>
                            </div>
                        </div>
                        <ApexLineChart incomes={incomes} expenses={expenses} />
                    </div>

                    <div
                        className="flex flex-col items-start justify-center bg-white
            rounded-md p-3 gap-4
            dark:bg-dark-cardBackground dark:text-dark-text"
                    >
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <h1
                                    className="text-3xl font-bold text-gray-700
                        dark:text-dark-text"
                                >
                                    {totalIncome}
                                </h1>
                                <p className="text-sm">Incomes overview </p>
                            </div>
                        </div>
                        <div>
                            <LineChart
                                allDatas={currentUserTransactions}
                                incomes={incomes}
                                expenses={expenses}
                                label="Income"
                            />
                        </div>
                    </div>

                    <div
                        className="flex flex-col items-start justify-center bg-white rounded-md p-3 gap-4
            dark:bg-dark-cardBackground dark:text-dark-text"
                    >
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <h1
                                    className="text-3xl font-bold text-gray-700
                        dark:text-dark-text"
                                >
                                    {totalExpenses}
                                </h1>
                                <p className="text-sm">Expenses overview</p>
                            </div>
                        </div>
                        <div>
                            <LineChart
                                allDatas={currentUserTransactions}
                                incomes={incomes}
                                expenses={expenses}
                                label="Expenses"
                            />
                        </div>
                    </div>
                    <div
                        className="flex flex-col items-start justify-center bg-white
            rounded-md p-3 gap-4
            dark:bg-dark-cardBackground dark:text-dark-text"
                    >
                        <BarChart
                            allDatas={currentUserTransactions}
                            showTitle={false}
                            type="x"
                        />
                    </div>

                    <div className="flex flex-col items-start justify-center bg-white rounded-md p-3 gap-4 dark:bg-dark-cardBackground dark:text-dark-text">
                        <div>
                            <DoughnutChart
                                allDatas={currentUserTransactions}
                                label="income"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center bg-white rounded-md p-3 gap-4   dark:bg-dark-cardBackground dark:text-dark-text">
                        <div>
                            <DoughnutChart
                                allDatas={currentUserTransactions}
                                label="expense"
                            />
                        </div>
                    </div>
                    <div
                        className="md:col-span-3 grid grid-cols-1 gap-4
                        md:grid-cols-2
             dark:bg-dark-cardBackground dark:text-dark-text rounded-md shadow-md shadow-color-2"
                    >
                        <RecentTransactions />

                        <SavingGoals showTitle={true} />
                        <BudgetTrackingChart />
                    </div>
                </section>
            )}
        </>
    );
};
export default DashboardHome;
