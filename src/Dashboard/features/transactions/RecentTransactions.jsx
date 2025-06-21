import { Link } from "react-router-dom";

import Table from "../../ui/Table";
import Transaction from "./Transaction";

import { useTransactions } from "../../Hooks/useTransactions";

const RecentTransactions = () => {
    const { currentUserTransactions } = useTransactions();

    const firstTen = currentUserTransactions.slice(0, 10);

    return (
        <div
            className="overflow-hidden rounded-md bg-white md:w-fit
        dark:bg-dark-cardBackground dark:text-dark-text p-2"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold">Recent Transactions</h1>
                    <p className="text-sm">Your last ten transactions</p>
                </div>

                <Link
                    to="/dashboard/transactions"
                    className="bg-light-primaryCTA text-white p-1 rounded-md font-bold"
                >
                    View all
                </Link>
            </div>
            <Table>
                {firstTen.map((transaction, index) => {
                    return (
                        <Transaction transaction={transaction} key={index}>
                            <Transaction.Icon />
                            <Transaction.Description />
                        </Transaction>
                    );
                })}
            </Table>
        </div>
    );
};

export default RecentTransactions;
