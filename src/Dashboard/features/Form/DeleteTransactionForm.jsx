import { useCallback } from "react";

import { format } from "date-fns";

import Button from "../Form/Button";
import Modal from "../../ui/Modal";

import { useDeleteTransaction } from "../../Hooks/useDeleteTransaction";
import { useDeleteSavings } from "../../Hooks/useDeleteSavings";
import { useDeleteBudget } from "../../Hooks/useDeleteBudget";
import { formatCurrency } from "../../Utils/CustomMethods";
import { formatDate } from "../../Utils/formatDate";

function DeleteDataForm({ data, onCloseForm, type }) {
    const dataId = data.id;

    const { deleteTransaction, isdeletingTransaction } = useDeleteTransaction();

    const { deleteSavings, isdeletingSavings } = useDeleteSavings();
    const { deleteBudget, isdeletingBudget } = useDeleteBudget();

    const handleDataDelete = useCallback(() => {
        if (type === "transaction") {
            deleteTransaction(dataId, {
                onSuccess: () => {
                    onCloseForm();
                }
            });
        }
        if (type === "savings") {
            deleteSavings(dataId, {
                onSuccess: () => {
                    onCloseForm();
                }
            });
        }
        if (type === "budget") {
            
            deleteBudget(dataId, {
                onSuccess: () => {
                    onCloseForm();
                }
            });
        }
    }, [dataId]);

    return (
        <Modal>
            <div
                className="bg-light-background rounded-md overflow-hidden
            dark:bg-dark-background p-3 w-3/4 md:w-3/12"
            >
                {type === "transaction" ? (
                    <h2 className="">
                        Do you really want to delete your
                        {" " + formatCurrency(data.amount)} {data.category}
                        {" " + data.type} that occured on
                        {" " + formatDate(data.date)}?
                    </h2>
                ) : (
                    <h2>
                        Do you really want to delete your{" "}
                        {type === "savings" ? (
                            <>
                                {data.method}
                                {" " + formatCurrency(data.target_amount)}{" "}
                                {data.title + " "}
                                savings?
                            </>
                        ) : (
                            <>
                                {" " + formatCurrency(data.amount)}{" "}
                                {data.category + " "}
                                budget tracking goal?
                            </>
                        )}
                    </h2>
                )}

                <div className="flex justify-between items-center py-2">
                    <Button
                        text="Cancel"
                        className="p-2 bg-light-sectionBackground rounded"
                        onButtonClick={onCloseForm}
                    />

                    <Button
                        text="Delete"
                        className="bg-red-500 font-bold p-2 rounded
                            text-white hover:bg-red-800"
                        loader={isdeletingTransaction || isdeletingSavings}
                        onButtonClick={handleDataDelete}
                    />
                </div>
            </div>
        </Modal>
    );
}
export default DeleteDataForm;
