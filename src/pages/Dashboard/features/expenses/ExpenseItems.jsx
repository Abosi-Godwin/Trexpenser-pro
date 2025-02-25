import { useState, useEffect } from "react";
import ListItem from "./Utilities/ListItem.jsx";
import EditItemsForm from "./Utilities/EditItemsForm.jsx";
import DeleteDataForm from "./Utilities/DeleteDataForm.jsx";
export default function Expenses({
    expenseItems,
    onDataEdited,
    onDataDeleted,
    onCurrencyFormat
}) {
    const [expenses, setExpenses] = useState([...expenseItems]);

    const [dataToEdit, setDataToEdit] = useState("");
    const [dataToDelete, setDataToDelete] = useState("");

    function hideEditForm() {
        setDataToEdit("");
    }
    function handleDataEdit(data) {
        setDataToEdit(data);
    }
    function handleDataDelete(data) {
        setDataToDelete(data);
    }

    useEffect(
        function () {
            setExpenses([...expenseItems].reverse().slice(0, 10));
        },
        [expenseItems]
    );
    return (
        <div className="flex flex-col gap-2 pb-5">
            <div className="bg-color-9 py-5 px-2">
                <h1 className="text-4xl text-color-7 font-bold uppercase">
                    All {<br />} expenses
                </h1>
                <p className="text-color-3 font-bold text-xl">
                    Your recent transactions.
                </p>
            </div>
            {dataToEdit && (
                <EditItemsForm
                    data={dataToEdit}
                    onFormHide={hideEditForm}
                    onFormEditted={onDataEdited}
                />
            )}
            {dataToDelete && (
                <DeleteDataForm
                    data={dataToDelete}
                    dataSetter={setDataToDelete}
                    onDataDeleted={onDataDeleted}
                    onCurrencyFormat={onCurrencyFormat}
                />
            )}
            <div className="grid gap-4 p-4 md:grid md:grid-cols-2">
                {expenses.map(expense => {
                    return (
                        <ListItem
                            expenseDetails={expense}
                            key={expense.id}
                            onCurrencyFormat={onCurrencyFormat}
                            onDataEdit={handleDataEdit}
                            onDataDelete={handleDataDelete}
                        />
                    );
                })}
            </div>
            <div className="flex align-middle justify-center w-full">
                <a
                    href="#"
                    className="text-xl font-bold text-color-3
                capitalize bg-color-9 p-2 rounded-md"
                >
                    View all transactions
                </a>
            </div>
        </div>
    );
}
