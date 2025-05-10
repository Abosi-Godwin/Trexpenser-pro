import { useEffect, useReducer } from "react";
import Button from "../../ui/Button";
import DateInput from "../../ui/DateInput";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";

import Modal from "../../ui/Modal";

import {
    incomeCategories,
    expenseCategories,
    expenseTypes
} from "../../../../data/data";

const datas = {
    type: "",
    category: "",
    description: "",
    amount: "",
    date: ""
};

const reducerFunc = (state, action) => {
    switch (action.type) {
        /*
        case "inputType":
            return { ...state, type: action.payload };*/

        case "UPDATE_FIELD":
            return { ...state, [action.payload.field]: action.payload.value };
        default:

    }
};

function AddExpenseForm({ onHandleForm }) {
    const [{ type, category, description, amount, date }, dispatch] =
        useReducer(reducerFunc, datas);

    function handleInputChange(value, inputType) {
        dispatch({
            type: "UPDATE_FIELD",
            payload: { field: inputType, value: value }
        });

       
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (
            type === "" ||
            category === "" ||
            description === "" ||
            amount === ""
        ) {
            return;
        } else {
            const newExpense = {
                id: 2 + 1,
                type: type,
                category,
                description,
                amount,
                date
            };
            onHandleForm(newExpense);
            //onFormSubmit(newExpense);
            /*setDescription("");
            setAmount("");*/
        }
    }

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
    }, []);

    return (
        <Modal>
            <div className="bg-light-background rounded-md overflow-hidden">
                <h1 className="text-2xl font-bold text-light-text p-2 mb-2">
                    Add a new transaction
                </h1>

                <form className="p-3 border-t-2 border-light-mainBackground flex flex-col gap-3">
                    <div className="w-full flex justify-between gap-4">
                        <SelectInput
                            options={expenseTypes}
                            labelFor="expenseType"
                            labelStyle=""
                            contStyle="row w-50"
                            label="Type:"
                            setDefOption={true}
                            defOptionVal="type"
                            onHandleInputChange={handleInputChange}
                        />

                        <SelectInput
                            options={
                                type === "income"
                                    ? incomeCategories
                                    : expenseCategories
                            }
                            labelFor="category"
                            label="Category:"
                            labelStyle=""
                            contStyle="row w-50"
                            setDefOption={true}
                            defOptionVal="category"
                            onHandleInputChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input
                            label="description"
                            inputType="text"
                            initialValue={description}
                            onHandleInputChange={handleInputChange}
                            max="20"
                            placeholder="A short simple description..."
                        />

                        <Input
                            label="amount"
                            inputType="number"
                            initialValue={amount}
                            max=""
                            onHandleInputChange={handleInputChange}
                            placeholder="Enter the amount..."
                        />
                        <DateInput
                            date={date}
                            minDate=""
                            maxDate={date}
                            className="outline-none rounded
                    text-color-8 bg-color-2 p-2"
                            onHandleDateChange={handleInputChange}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Button
                            text="Cancel"
                            className="w-32 bg-light-sectionBackground uppercase p-2 rounded text-color-8
        hover:bg-color-6 hover:text-color-2 font-bold text-xl"
                            onButtonClick={onHandleForm}
                        />
                        <Button
                            text="Add"
                            className="w-36 bg-light-primaryCTA uppercase p-2
                            rounded text-white
        hover:bg-light-secondaryAccent font-bold text-xl"
                            onButtonClick={handleFormSubmit}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
export default AddExpenseForm;
