import { useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

import Button from "../features/Form/Button";
import SelectInput from "../features/Form/SelectInput";
import Table from "../ui/Table";
import Sorting from "../ui/Sorting";
import Filtering from "../ui/Filtering";
import TransactionForm from "../features/Form/TransactionForm";

import { useTransactions } from "../Hooks/useTransactions";
import Transaction from "../features/transactions/Transaction";
import { transactionFilterOptions, transactionSortOptions } from "../data/data";
import { sortingSwitchFunc } from "../Utils/SortSwitchFunc";
import { filterSwitchFunc } from "../Utils/FilterSwitchFunc";
const maxTransactionToShow = 10;

function Transactions() {
    const [openForm, setOpenForm] = useState(false);

    const [searchParams] = useSearchParams();
    const sortParams = searchParams.get("sortBy");
    const filterParams = searchParams.get("filterBy");

    const { currentUserTransactions } = useTransactions();

    let transactions = null;


    transactions = sortingSwitchFunc(sortParams, currentUserTransactions);

    transactions = filterSwitchFunc(filterParams, currentUserTransactions);


    const totalTransaction = transactions.length;

    const handleOpenForm = () => {
        setOpenForm(prev => !prev);
    };

    return (
        <div
            className="bg-light-cardBackground overflow-hidden rounded-md
         dark:bg-dark-cardBackground dark:text-dark-text"
        >
            <div className="flex justify-between items-center py-5 px-2">
                <h1 className="text-2xl font-bold">All transactions </h1>
                <Button
                    text="Add new"
                    className="bg-light-primaryCTA p-1 rounded-md outline-0
                    font-semibold text-xl text-white dark:bg-dark-primaryCTA"
                    type="cta"
                    model="normal"
                    onButtonClick={handleOpenForm}
                />
                {openForm && <TransactionForm onHandleForm={handleOpenForm} />}
            </div>
            <div>
                <div
                    className="flex justify-between p-2 items-center gap-4
                border-b-2 border-b-light-dividers"
                >
                    <Filtering
                        options={transactionFilterOptions}
                        label="Filter"
                        labelFor="filtering"
                    />
                    <Sorting
                        options={transactionSortOptions}
                        label="Sort"
                        labelFor="sorting"
                    />
                </div>
                <Table>
                    {transactions.map(transaction => {
                        return (
                            <Transaction
                                transaction={transaction}
                                key={transaction.id}
                            >
                                <Transaction.Icon />
                                <Transaction.Description />
                                <Transaction.Action />
                            </Transaction>
                        );
                    })}
                </Table>
            </div>
            <div
                className="border-t-2 border-t-light-dividers p-2 flex items-center justify-around
            flex-col gap-3"
            >
                <p>
                    You're seeing{" "}
                    <span className="font-semibold"> {totalTransaction} </span>{" "}
                    to
                    <span className="font-semibold">
                        {maxTransactionToShow >= totalTransaction
                            ? totalTransaction
                            : maxTransactionToShow}
                    </span>{" "}
                    of
                    <span className="font-semibold"> {totalTransaction} </span>
                    transactions.
                </p>
                <div
                    className="flex justify-between items-center w-full
                md:justify-center md:gap-10"
                >
                    <Button
                        text={<FaCircleArrowLeft />}
                        className="bg-light-primaryCTA text-white px-5 py-2
                        rounded-md"
                    />
                    <Button
                        text={<FaCircleArrowRight />}
                        className="bg-light-primaryCTA text-white px-5 py-2
                        rounded-md"
                    />
                </div>
            </div>
        </div>
    );
}
export default Transactions;
