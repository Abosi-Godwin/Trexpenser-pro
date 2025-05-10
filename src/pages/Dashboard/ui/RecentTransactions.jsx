import { Link } from "react-router-dom";

import Table from "./Table";

const RecentTransactions = ({ allDatas: transactions }) => {
  
    const firstTen = transactions.slice(0, 10);

    return (
        <div
            className="overflow-hidden rounded-md p-4 bg-white md:w-fit
        dark:bg-dark-cardBackground dark:text-dark-text"
        >
            <div className="mb-5 flex justify-between items-center">
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
            <Table datas={firstTen} />
        </div>
    );
};

export default RecentTransactions;
