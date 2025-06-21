import Nav from "./Nav";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import ApexLineChart from "./ApexLineChart";
import AreaChart from "./AreaChart";
import RecentTransactions from "./RecentTransactions";
import SavingsAndBudgetAnalytics from "./SavingsAndBudgetAnalytics";
import { Outlet } from "react-router";

import { useTransactions } from "../Hooks/useTransactions";

import {
    formatCurrency,
    roundTotalPrice,
    roundDownPrice
} from "../Utils/CustomMethods";

const DashboardHeader = () => {
    const { incomes, expenses, transactions } = useTransactions();

    const incomePrices = incomes.map(income => income.amount);
    const expensePrices = expenses.map(income => income.amount);

    const totalBalance = formatCurrency(roundTotalPrice(transactions));
    const totalIncome = formatCurrency(roundDownPrice(incomePrices));
    const totalExpenses = formatCurrency(roundDownPrice(expensePrices));

    return (
        <header className="bg-color-1 md:min-h-screen">
          
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:px-8">
                <div
                    className="flex flex-col items-start justify-center bg-white rounded-md shadow-md
                    shadow-color-2 p-3 gap-4"
                >
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-700">
                                {totalBalance}
                            </h1>
                            <p className="text-sm">
                                Income and expenses overview
                            </p>
                        </div>
                    </div>
                    <div>
                        <ApexLineChart />
                    </div>
                </div>

                <div
                    className="flex flex-col items-start justify-center bg-white rounded-md shadow-md
                    shadow-color-2 p-3 gap-4"
                >
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-700">
                                {totalIncome}
                            </h1>{" "}
                            <p className="text-sm">Incomes overview </p>
                        </div>
                    </div>
                    <div>
                        <LineChart label="Income" />
                    </div>
                </div>

                <div
                    className="flex flex-col items-start justify-center bg-white rounded-md shadow-md
                    shadow-color-2 p-3 gap-4"
                >
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-700">
                                {totalExpenses}
                            </h1>{" "}
                            <p className="text-sm">Expenses overview</p>
                        </div>
                    </div>
                    <div>
                        <LineChart label="Expenses" />
                    </div>
                </div>

                <div
                    className="flex flex-col items-start justify-center bg-white rounded-md shadow-md
                    shadow-color-2 p-3 gap-4"
                >
                    <div>
                        <BarChart showTitle={false} type="x" />
                    </div>
                </div>

                <div
                    className="flex flex-col items-start justify-center bg-white rounded-md shadow-md
                    shadow-color-2 p-3 gap-4"
                >
                    <div>
                        <DoughnutChart label="expense" />
                    </div>
                </div>

                <div
                    className="flex flex-col items-start justify-center bg-white rounded-md shadow-md
                    shadow-color-2 p-3 gap-4"
                >
                    <div>
                        <DoughnutChart label="income" />
                    </div>
                </div>

                <div
                    className="md:col-span-3            bg-cred-600 gap-4 flex
                    flex-col
                md:flex-row"
                >
                    <RecentTransactions />
                    <SavingsAndBudgetAnalytics />
                </div>
            </div>
            <Outlet />
        </header>
    );
};
export default DashboardHeader;
