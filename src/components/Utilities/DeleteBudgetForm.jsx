import Button from "./Inputs/Button.jsx";
import Modal from "./Modal.jsx";

function DeleteBudgetForm({
    data,
    onFormClose,
    onFormDelete,
    onCurrencyFormat
}) {
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
                    {" " + onCurrencyFormat(data.amount)} {data.category} budget
                    tracking that starts from
                    {" " + data.startDate.replace(/-/g, "/")} to{" "}
                    {" " + data.endDate.replace(/-/g, "/")}?
                </h2>
            </div>
            <div className="flex justify-between items-center w-full  py-3">
                <Button
                    text="Cancel"
                    style="w-32 bg-color-8 uppercase p-2 rounded
                            text-color-2
        hover:bg-color-9 hover:text-color-2 font-bold text-xl"
                    onButtonClick={onFormClose}
                />

                <Button
                    text="Delete"
                    style="w-32 bg-red-600 uppercase p-2 rounded
                            text-color-2
        hover:bg-red-900 hover:text-color-2 font-bold text-xl"
                    onButtonClick={() => onFormDelete(data)}
                />
            </div>
        </div></Modal>
    );
}
export default DeleteBudgetForm;
