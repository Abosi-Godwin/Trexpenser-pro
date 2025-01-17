import { FaArrowUp, FaArrowDown, FaEllipsis } from "react-icons/fa6";

import { useTransactions } from "../contexts/TransactionsContext.jsx";
import { Link } from "react-router";
import { formatCurrency } from "../Utils/CustomMethods.js";
import { formatDistance, format, subDays } from "date-fns";

const RecentTransactions = () => {
    const { transactions } = useTransactions();

    return (
        <div
            className="overflow-hidden rounded-md shadow-md
                    shadow-color-2 w-full p-4 bg-white md:w-fit"
        >
            <div className="mb-5 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-700">
                        Recent Transactions{" "}
                    </h1>
                    <p className="text-sm">Your last ten transactions</p>
                </div>
                <div>
                    <Link
                        to="/transactions"
                        className="bg-color-3 text-color-8 lowercase p-1
                        rounded-md font-bold"
                    >
                        View All
                    </Link>
                </div>
            </div>
            <div
                className="w-full h5-96 bg-color-1 overflow-scroll p-3
            rounded-md"
            >
                <div
                    className="w-[480px] h-full p-2 rounded-md divide-y-2
                    divide-color-2 md:w-fit"
                >
                    <div
                        className={`w-full p-2 rounded flex
                                justtify-center items-center gap-2 bg-white`}
                    >
                        <div
                            className="grid grid-cols-transactions
                                    items-center gap-3
                                justify-between w-[90%] pl-12 h-8"
                        >
                            <p>Source</p>
                            <div className="flex justify-between">
                                <p>Amount</p>
                                <p>Date</p>
                            </div>
                        </div>
                    </div>
                    {transactions.slice(0, 10).map((transaction, index) => {
                        const isIncome = transaction.type === "income";

                        return (
                            <div
                                className={`w-full  px-2 rounded flex
                                justify-between gap-2
                                    items-center py-5`}
                                key={index}
                            >
                                <div
                                    className={`p-2 bg-color-2 rounded-md w-fit
                                ${isIncome ? "text-color-8" : "text-red-800"}`}
                                >
                                    {isIncome ? <FaArrowUp /> : <FaArrowDown />}
                                </div>

                                <div
                                    className="grid grid-cols-transactions
                                    items-center gap-3
                                justify-between w-[90%] bg-ambe4r-700 px-2"
                                >
                                    <p
                                        className="font-bold text-gray-600
                                   "
                                    >
                                        {transaction.description}
                                    </p>
                                    <div
                                        className="flex gap-4 justify-between
                                    items-center text-sm"
                                    >
                                        <p className="text-color-8 font-bold">
                                            {formatCurrency(transaction.amount)}
                                        </p>
                                        <p>
                                            {format(
                                                transaction.date,
                                                "MMM, dd, yyyy"
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`p-2 bg-color-2 rounded-md w-fit
                                `}
                                >
                                    {<FaEllipsis />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecentTransactions;
