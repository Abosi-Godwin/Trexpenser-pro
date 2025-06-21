import { format } from "date-fns";

import Button from "../Form/Button";
import Modal from "../../ui/Modal";

import { useDeleteTransaction } from "../../Hooks/useDeleteTransaction";
import { formatCurrency } from "../../Utils/CustomMethods";

function DeleteTransactionForm({ data, onCloseForm }) {
    const transactionId = data.id;

    const { deleteTransaction, isdeletingTransaction } = useDeleteTransaction();

    function handleDataDelete() {
        deleteTransaction(transactionId, {
            onSuccess: () => {
                onCloseForm();
            }
        });
    }

    return (
        <Modal>
            <div
                className="bg-light-background rounded-md overflow-hidden
            dark:bg-dark-background p-3 w-3/4 md:w-3/12"
            >
                <h2 className="">
                    Do you really want to delete your
                    {" " + formatCurrency(data.amount)} {data.category}
                    {" " + data.type} that occured on
                    {" " + format(data.date, "MMM, dd, yyyy")}?
                </h2>

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
                        loader={isdeletingTransaction}
                        onButtonClick={handleDataDelete}
                    />
                </div>
            </div>
        </Modal>
    );
}
export default DeleteTransactionForm;
