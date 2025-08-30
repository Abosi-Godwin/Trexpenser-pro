import { createContext, useContext } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

import { formatDate } from "../../Utils/formatDate";
import { formatCurrency } from "../../Utils/formatCurrency";

import MenuCard from "../../ui/MenuCard";

const TransactionContext = createContext();

const useTransaction = () => {
    const transactionContext = useContext(TransactionContext);

    if (!transactionContext) {
        throw new Error("Context is used outside the parent");
    }
    return transactionContext;
};

const Transaction = ({ children, transaction }) => {
    return (
        <TransactionContext.Provider value={{ transaction }}>
            <div
                className="w-full px-2 rounded flex justify-between gap-2
            items-center py-5 relative"
            >
                {children}
            </div>
        </TransactionContext.Provider>
    );
};
const Icon = () => {
    const { transaction } = useTransaction();
    const isIncome = transaction?.type === "income";

    return (
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
    );
};

const Description = () => {
    const { transaction } = useTransaction();
   
    return (
        <div className="grid grid-cols-transactions items-center gap-3 justify-between w-[90%] px-2">
            <div>
                <p className="font-bold">{transaction?.description}</p>
                <p className="text-sm capitalize">{transaction?.category}</p>
            </div>

            <div className="flex gap-4 justify-between items-center text-sm">
                <p className="">{formatCurrency(transaction?.amount)}</p>
                <p>{formatDate(transaction?.date)}</p>
            </div>
        </div>
    );
};

const Action = () => {
    const { transaction } = useTransaction();
    return (
        <MenuCard data={transaction} type="transaction">
            <MenuCard.Icon />
            <MenuCard.Options />
        </MenuCard>
    );
};

Transaction.Icon = Icon;
Transaction.Description = Description;
Transaction.Action = Action;

export default Transaction;
