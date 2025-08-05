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

const maxTransactionToShow = 10;

const transactionSortOptions = [
    { label: "Default (Newest)", value: "date_desc" },
    { label: "Date (Oldest first)", value: "date_asc" },
    { label: "Amount (Highest first)", value: "amount_desc" },
    { label: "Amount (Lowest first)", value: "amount_asc" },
    { label: "Category (A → Z)", value: "category_asc" },
    { label: "Category (Z → A)", value: "category_desc" },
    { label: "Type (Income first)", value: "type_income_first" },
    { label: "Type (Expense first)", value: "type_expense_first" }
];
const transactionFilterOptions = [
    { label: "All", value: "all" },
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" }
];
function Transactions() {
    const [openForm, setOpenForm] = useState(false);

    const [searchParams] = useSearchParams();
    const sortParams = searchParams.get("sortBy");
    const filterParams = searchParams.get("filterBy");

    const { currentUserTransactions } = useTransactions();

    let transactions;

    switch (sortParams) {
        case "date_desc":
            transactions = currentUserTransactions.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
        case "date_asc":
            transactions = currentUserTransactions.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            break;
        case "amount_desc":
            transactions = currentUserTransactions.sort(
                (a, b) => +b.amount - +a.amount
            );
            break;
        case "amount_asc":
            transactions = currentUserTransactions.sort(
                (a, b) => +a.amount - +b.amount
            );
            break;
        case "category_desc":
            transactions = currentUserTransactions.sort(
                (a, b) => b.category - a.category
            );
            break;
        case "category_asc":
            transactions = currentUserTransactions.sort(
                (a, b) => a.category - b.category
            );
            break;
        case "type_income_first":
            transactions = currentUserTransactions.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
        case "type_expense_first":
            transactions = currentUserTransactions.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            break;
        default:
            transactions = currentUserTransactions;
    }

    switch (filterParams) {
        case "income":
            transactions = currentUserTransactions.filter(
                item => item.type === "income"
            );
            break;
        case "expense":
            transactions = currentUserTransactions.filter(
                item => item.type === "expense"
            );
            break;
        default:
            transactions = currentUserTransactions;
    }

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
                    {transactions.map(({ id, ...rest }) => {
                        return (
                            <Transaction transaction={rest} key={id}>
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
