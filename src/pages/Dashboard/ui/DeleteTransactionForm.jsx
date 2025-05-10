import Button from "./Inputs/Button.jsx";
import Modal from "./Modal.jsx";

function DeleteTransactionForm({ data, dataSetter, onDataDeleted, onCurrencyFormat }) {
    function handleDataDelete() {
        onDataDeleted(data);
        dataSetter("");
    }

    return (
        <Modal>
            <div
                className="w-full h-fit flex items-center flex-col
                justify-center gap-3 bg-color-6 text-color-2 p-3 rounded-md
                md:w-1/2"
            >
                <div>
                    <h2 className="text-xl font-bold text-color-3">
                        Do you really want to delete your
                        {" " + onCurrencyFormat(data.amount)} {data.category}{" "}
                        {" " + data.type} that occured on
                        {" " + data.date.replace(/-/g, "/")}?
                    </h2>
                </div>
                <div className="flex justify-between items-center w-full  py-3">
                    <Button
                        text="Cancel"
                        style="w-32 bg-color-8 uppercase p-2 rounded
                            text-color-2
        hover:bg-color-9 hover:text-color-2 font-bold text-xl"
                        onButtonClick={() => dataSetter("")}
                    />

                    <Button
                        text="Delete"
                        style="w-32 bg-red-600 uppercase p-2 rounded
                            text-color-2
        hover:bg-red-900 hover:text-color-2 font-bold text-xl"
                        onButtonClick={handleDataDelete}
                    />
                </div>
            </div>
        </Modal>
    );
}
export default DeleteTransactionForm;
