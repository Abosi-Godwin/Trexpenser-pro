import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Table from "../ui/Table";
import Sorting from "../ui/Sorting";
import Filtering from "../ui/Filtering";
import Button from "../features/Form/Button";
import TableFooter from "../ui/TableFooter";
import EmptyDashboard from "../ui/EmptyDashboard";
import TransactionForm from "../features/Form/TransactionForm";
import Transaction from "../features/transactions/Transaction";

import { useTransactions } from "../hooks/useTransactions";
import { sortingSwitchFunc } from "../utils/SortSwitchFunc";
import { filterSwitchFunc } from "../utils/FilterSwitchFunc";
import { transactionFilterOptions, transactionSortOptions } from "../data/data";

const maxTransactionToShow = 10;

function Transactions() {
    const [openForm, setOpenForm] = useState(false);
    const [searchParams] = useSearchParams();

    const sortParams = searchParams.get("sortBy");
    const filterParams = searchParams.get("filterBy");

    const { currentUserTransactions } = useTransactions();

    let transactions = sortingSwitchFunc(
        sortParams,
        currentUserTransactions ?? []
    );
    transactions = filterSwitchFunc(filterParams, transactions);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [sortParams, filterParams]);

    const totalTransaction = transactions.length;
    const totalPages = Math.ceil(totalTransaction / maxTransactionToShow);

    const paginated = transactions.slice(
        (currentPage - 1) * maxTransactionToShow,
        currentPage * maxTransactionToShow
    );

    const handleOpenForm = () => setOpenForm(prev => !prev);

    return (
        <div
            className="bg-light-cardBackground overflow-hidden rounded-md 
      dark:bg-dark-cardBackground dark:text-dark-text"
        >
            {/* Header */}
            <div className="flex justify-between items-center py-5 px-2">
                <h1 className="text-2xl font-bold">All Transactions</h1>
                <Button
                    text="Add new"
                    className="bg-light-primaryCTA p-1 rounded-md outline-0
            font-semibold text-xl text-white dark:bg-dark-primaryCTA"
                    type="cta"
                    model="normal"
                    onButtonClick={handleOpenForm}
                />
            </div>

            {openForm && <TransactionForm onCloseForm={handleOpenForm} />}

            {totalTransaction > 0 ? (
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
                        {paginated.map(transaction => (
                            <Transaction
                                transaction={transaction}
                                key={transaction.id}
                            >
                                <Transaction.Icon />
                                <Transaction.Description />
                                <Transaction.Action />
                            </Transaction>
                        ))}
                    </Table>

                    <TableFooter
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalTransaction={totalTransaction}
                        maxTransactionToShow={maxTransactionToShow}
                        onNext={() =>
                            setCurrentPage(p => Math.min(p + 1, totalPages))
                        }
                        onPrev={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    />
                </>
            ) : (
                <EmptyDashboard
                    link="Log an entry"
                    imgSrc="/undraw_credit-card_t6qm.svg"
                    destination="transactions"
                    description="No transaction log yet. Add one or more to track your income and expenses."
                    showBtn={false}
                />
            )}
        </div>
    );
}

export default Transactions;
