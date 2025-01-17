import Nav from "./Nav";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import ApexLineChart from "./ApexLineChart";
import AreaChart from "./AreaChart";
import RecentTransactions from "./RecentTransactions";
import SavingsAndBudgetAnalytics from "./SavingsAndBudgetAnalytics";
import { useTransactions } from "../contexts/TransactionsContext";
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
            <Nav></Nav>
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
                        <p
                            className="font-bold text-color-5 bg-color-1 p-1
                        rounded"
                        >
                            122%
                        </p>
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
                        <p
                            className="font-bold text-color-5 bg-color-1 p-1
                        rounded"
                        >
                            122%
                        </p>
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
                        <p
                            className="font-bold text-color-5 bg-color-1 p-1
                        rounded"
                        >
                            122%
                        </p>
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
        </header>
    );
};
export default DashboardHeader;
