import { useState, useEffect } from "react";
import Button from "./Utilities/Inputs/Button.jsx";
import DateInput from "./Utilities/Inputs/DateInput.jsx";
import Input from "./Utilities/Inputs/Input.jsx";
import Categories from "./Utilities/Inputs/Categories.jsx";
import {
    incomeCategories,
    expenseCategories,
    expenseTypes
} from "../data/data.js";
 
function NewTransaction({ expenses, onFormSubmit }) {
    const [expenseType, setExpenseType] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    function handleInputChange(value, dataSetter) {
        dataSetter(value);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (
            expenseType === "" ||
            category === "" ||
            description === "" ||
            amount === ""
        ) {
            return;
        } else {
            const newExpense = {
                id: expenses.length + 1,
                type: expenseType,
                category,
                description,
                amount,
                date
            };
            onFormSubmit(newExpense);
            setDescription("");
            setAmount("");
        }
    }
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);
    return (
        <div className="bg-color-3 py-6 px-2 text-color-8">
            <h1 className="text-2xl font-bold text-color-8">
                Add a new transaction
            </h1>

            <form
                className="border-2 border-color-5 p-3 flex flex-col gap-3
            rounded mt-2.5"
            >
                <div className="w-full flex justify-between gap-4">
                    <Categories
                        options={expenseTypes}
                        iniValue={expenseType}
                        labelFor="expenseType"
                        labelStyle="text-color-8"
                        contStyle="row w-50"
                        label="Type:"
                        setDefOption={true}
                        defOptionVal="type"
                        valueSetter={setExpenseType}
                        onHandleInputChange={handleInputChange}
                    />

                    <Categories
                        options={
                            expenseType === "income"
                                ? incomeCategories
                                : expenseCategories
                        }
                        iniValue={category}
                        labelFor="category"
                        label="Category:"
                        valueSetter={setCategory}
                        labelStyle="text-color-8"
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
                        valueSetter={setDescription}
                        max="20"
                        placeholder="A short simple description..."
                    />

                    <Input
                        label="amount"
                        inputType="number"
                        initialValue={amount}
                        max=""
                        onHandleInputChange={handleInputChange}
                        valueSetter={setAmount}
                        placeholder="Enter the amount..."
                    />
                </div>
                <div className="flex justify-between items-center">
                    <DateInput
                        date={date}
                        minDate=""
                        maxDate={date}
                        setDate={setDate}
                        style="outline-none rounded
                    text-color-8 bg-color-2 p-2"
                        onHandleDateChange={handleInputChange}
                    />
                    <div>
                        <Button
                            text="Add"
                            style="w-32 bg-color-4 uppercase p-2 rounded text-color-8
        hover:bg-color-6 hover:text-color-2 font-bold text-xl"
                            onButtonClick={handleFormSubmit}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
export default NewTransaction;
