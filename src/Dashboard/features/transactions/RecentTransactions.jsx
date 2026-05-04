import { Link } from "react-router-dom";

import Table from "../../ui/Table";
import Transaction from "./Transaction";
import EmptyDashboard from "../../ui/EmptyDashboard";
import { useTransactions } from "../../hooks/useTransactions";

const RecentTransactions = () => {
  
  
    const { currentUserTransactions } = useTransactions();
    const firstTen = (currentUserTransactions ?? []).slice(0, 10);

    return (
        <div
            className="overflow-hidden rounded-md bg-white md:w-fit
      dark:bg-dark-cardBackground dark:text-dark-text p-2"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Recent Transactions</h2>
                    <p className="text-sm">Your last ten transactions</p>
                </div>
                <Link
                    to="/transactions"
                    className="bg-light-primaryCTA text-white px-3 py-1.5 
                     rounded-md font-bold text-sm"
                >
                    View all
                </Link>
            </div>

            {firstTen.length > 0 ? (
                <Table>
                    {firstTen.map(transaction => (
                        <Transaction
                            transaction={transaction}
                            key={transaction.id}
                        >
                            <Transaction.Icon />
                            <Transaction.Description />
                        </Transaction>
                    ))}
                </Table>
            ) : (
                <EmptyDashboard
                    link="Log an entry"
                    imgSrc="/undraw_credit-card_t6qm.svg"
                    destination="transactions"
                    description="No transaction log yet. Add one or more to track your income and expenses."
                    showBtn={true}
                />
            )}
        </div>
    );
};

export default RecentTransactions;
