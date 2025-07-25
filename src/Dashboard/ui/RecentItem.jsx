import { format } from "date-fns";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { formatCurrency } from "../Utils/CustomMethods";

import { RecentItemMenuCard } from "./RecentItemMenu";

const RecentItem = ({ transaction }) => {
    const isIncome = transaction.type === "income";

    return (
        <div
            className="px-2 rounded flex justify-between gap-2
            items-center py-5 relative bg-amber-600"
        >
            <div
                className={`p-2 bg-light-sectionBackground rounded-md w-fit
                dark:bg-dark-sectionBackground 
                                ${
                                    isIncome
                                        ? "text-light-text dark:text-dark-text"
                                        : "text-red-800"
                                }`}
            >
                {isIncome ? <FaArrowUp /> : <FaArrowDown />}
            </div>

            <div className="grid grid-cols-transactions items-center gap-3 justify-between w-[90%] px-2">
                <div>
                    <p className="font-bold">{transaction.description}</p>
                    <p className="text-sm capitalize">{transaction.category}</p>
                </div>
                <div className="flex gap-4 justify-between items-center text-sm">
                    <p className="">{formatCurrency(transaction.amount)}</p>
                    <p>{format(transaction.date, "MMM, dd, yyyy")}</p>
                </div>
            </div>
            <RecentItemMenuCard transaction={transaction} />
        </div>
    );
};
export default RecentItem;
