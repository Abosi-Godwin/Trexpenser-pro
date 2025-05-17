import { useEffect, useReducer, useState } from "react";
import { toast } from "react-hot-toast";

import Button from "../ui/Button";
import DateInput from "../ui/DateInput";
import Input from "../ui/Input";
import SelectInput from "../ui/SelectInput";
import Modal from "../ui/Modal";

import { useAuth } from "../../../contexts/AuthContext";
import { useReducerFunc } from "../../../Hooks/useReducerFunc";

import {
    incomeCategories,
    expenseCategories,
    expenseTypes
} from "../../../data/data";

const datas = {
    type: "Income",
    category: "",
    description: "",
    amount: "",
    date: ""
};

function TransactionForm({ onHandleForm }) {
    const [today, setToday] = useState();
    const { user, addTransaction, isAddingTransaction } = useAuth();

    const { states, inputChange } = useReducerFunc(datas);

    const { type, category, description, amount, date } = states;

    function handleInputChange(value, inputType) {inputChange(inputType, value)}

    function handleFormSubmit(event) {
        event.preventDefault();
        if (
            type === "" ||
            category === "" ||
            description === "" ||
            amount === "" ||
            date === ""
        ) {
            toast.error("All inputs are required");
            return;
        }

        const newTransaction = {
            user_id: user?.user?.id,
            type,
            category,
            description,
            amount,
            date
        };
        addTransaction(newTransaction, {
            onSuccess: () => {
                onHandleForm(event);
            }
        });
    }

    useEffect(() => {
        const todayDate = new Date().toISOString().split("T")[0];
        setToday(todayDate);
    }, [setToday]);

    return (
        <Modal>
            <div
                className="bg-light-background rounded-md overflow-hidden
            dark:bg-dark-background"
            >
                <h1
                    className="text-2xl font-bold text-light-text p-2 mb-2
                dark:text-dark-text"
                >
                    Add a new transaction
                </h1>

                <form className="p-3 border-t-2 border-light-mainBackground flex flex-col gap-3">
                    <div className="w-full flex justify-between gap-4">
                        <SelectInput
                            options={expenseTypes}
                            labelFor="expenseType"
                            labelStyle="capitalize"
                            contStyle="row w-50"
                            label="type"
                            setDefOption={true}
                            defOptionVal="type"
                            onHandleInputChange={handleInputChange}
                            disable={isAddingTransaction}
                        />

                        <SelectInput
                            options={
                                type === "income"
                                    ? incomeCategories
                                    : expenseCategories
                            }
                            labelFor="category"
                            label="category"
                            labelStyle="capitalize"
                            contStyle="row w-50"
                            setDefOption={true}
                            defOptionVal="category"
                            onHandleInputChange={handleInputChange}
                            disable={isAddingTransaction}
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
                            disable={isAddingTransaction}
                        />

                        <Input
                            label="amount"
                            inputType="number"
                            initialValue={amount}
                            max=""
                            onHandleInputChange={handleInputChange}
                            placeholder="Enter the amount..."
                            disable={isAddingTransaction}
                        />
                        <DateInput
                            today={today}
                            minDate=""
                            label="date"
                            maxDate={today}
                            className="outline-none rounded
                   bg-light-sectionBackground p-2 w-full"
                            onHandleDateChange={handleInputChange}
                            disable={isAddingTransaction}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Button
                            text="Cancel"
                            className="w-32 bg-light-sectionBackground uppercase
                            p-2 rounded-md font-bold text-xl"
                            disable={isAddingTransaction}
                            onButtonClick={onHandleForm}
                        />
                        <Button
                            text="Add"
                            disable={isAddingTransaction}
                            loader={isAddingTransaction}
                            className="w-36 bg-light-primaryCTA uppercase p-2
                            flex items-center justify-center
                            rounded text-white
        hover:bg-light-secondaryAccent font-bold text-xl
        dark:bg-dark-primaryCTA"
                            onButtonClick={handleFormSubmit}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
export default TransactionForm;
