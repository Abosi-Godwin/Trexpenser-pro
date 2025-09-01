import { useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import Button from "../features/Form/Button";
import SelectInput from "../features/Form/SelectInput";
import Table from "../ui/Table";
import Sorting from "../ui/Sorting";
import Filtering from "../ui/Filtering";
import TableFooter from "../ui/TableFooter";
import EmptyDashboard from "../ui/EmptyDashboard";
import TransactionForm from "../features/Form/TransactionForm";
import Transaction from "../features/transactions/Transaction";

import { useTransactions } from "../Hooks/useTransactions";
import { sortingSwitchFunc } from "../Utils/SortSwitchFunc";
import { filterSwitchFunc } from "../Utils/FilterSwitchFunc";

import { transactionFilterOptions, transactionSortOptions } from "../data/data";

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

    const firstItem = 1;

    const totalTransaction = transactions.length;

    const handleOpenForm = () => {
        setOpenForm(prev => !prev);
    };

    return (
        <div className="bg-light-cardBackground overflow-hidden rounded-md dark:bg-dark-cardBackground dark:text-dark-text">
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
            {totalTransaction >= 1 ? (
                <>
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
                    <TableFooter
                        maxTransactionToShow={maxTransactionToShow}
                        totalTransaction={totalTransaction}
                    />
                </>
            ) : (
                <EmptyDashboard
                    link="Log an entry"
                    imgSrc="/undraw_credit-card_t6qm.svg"
                    destination="transactions"
                    description="No transaction log yet. add one or more to
                    track your income and expense."
                    showBtn={false}
                />
            )}
        </div>
    );
}
export default Transactions;
