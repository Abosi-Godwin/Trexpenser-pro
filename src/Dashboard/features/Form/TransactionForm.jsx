import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Button from "./Button";
import DateInput from "./DateInput";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Modal from "../../ui/Modal";
import Form from "./Form";

import { useAuth } from "../../contexts/AuthContext";
import { useAddTransaction } from "../../Hooks/useAddTransaction";
import { useToday } from "../../Hooks/useDate";
import {
    incomeCategories,
    expenseCategories,
    expenseTypes
} from "../../data/data";

function TransactionForm({ onHandleForm }) {
    const { user, savings, updateSavings } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const type = watch("type");

    const {
        addTransaction,
        addedTransaction,
        isAddingTransaction,
        isAddingTransactionError,
        isAddingTransactionSucces
    } = useAddTransaction();

    function handleFormSubmit(datas) {
        console.log(datas);
    }
    const { today } = useToday();
    return (
        <Modal>
            <div
                className="bg-light-cardBackground rounded-md w-4/5 overflow-hidden
            dark:bg-dark-cardBackground"
            >
                <h1
                    className="text-2xl font-bold text-light-text p-2 mb-2
                dark:text-dark-text"
                >
                    Add a new transaction
                </h1>
                <Form submit={() => handleSubmit(handleFormSubmit)}>
                    {" "}
                    <div className="w-full flex justify-between gap-4">
                        <SelectInput
                            options={expenseTypes}
                            labelFor="expenseType"
                            label="type"
                            disable={isAddingTransaction}
                            register={register}
                            error={errors}
                        />

                        <SelectInput
                            options={
                                type === "Income"
                                    ? incomeCategories
                                    : expenseCategories
                            }
                            labelFor="category"
                            label="category"
                            disable={isAddingTransaction}
                            register={register}
                            error={errors}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input
                            label="description"
                            inputType="text"
                            register={register}
                            error={errors}
                            max="20"
                            placeholder="A short simple description..."
                            disable={isAddingTransaction}
                        />

                        <Input
                            label="amount"
                            inputType="number"
                            max=""
                            register={register}
                            error={errors}
                            placeholder="Enter the amount..."
                            disable={isAddingTransaction}
                        />
                    </div>
                    <DateInput
                        minDate=""
                        label="date"
                        maxDate={today}
                        register={register}
                        error={errors}
                        className="outline-none rounded
                   bg-light-sectionBackground  dark:bg-dark-sectionBackground dark:text-dark-text p-2 w-full"
                        disable={isAddingTransaction}
                    />
                    <div className="flex justify-between items-center gap-2">
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
                            onButtonClick={handleSubmit}
                        />
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
export default TransactionForm;
/*

    function handleFormSubmit(datas) {
        console.log(datas);
        const { type, amount, category, date, description } = datas;

        
        if (
            type === "" ||
            type === "Select" ||
            category === "" ||
            category === "Select" ||
            amount === "" ||
            date === "" ||
            description === ""
        ) {
            toast.error("All inputs are required");
            return;
        }

        const newTransaction = {
            ...datas,
            type: datas.type.toLowerCase(),
            user_id: user?.user?.id
        };

        addTransaction(newTransaction, {
            onSuccess: ([data]) => {
                onHandleForm();
                if (data.type !== "income") return;

                const categorySavings = savings.find(
                    saving => saving.funded_by === data.category
                );

                const { id, percentage } = categorySavings;

                const amountMade = data.amount;
                const amountToSave = (percentage / 100) * amountMade;
                const savingsId = id;

                updateSavings({ amountToSave, savingsId });
            }
        });
        
        
    }
    
 <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="p-3 border-t-2 border-light-Background flex flex-col gap-3"
                >
                    <div className="w-full flex justify-between gap-4">
                        <SelectInput
                            options={expenseTypes}
                            labelFor="expenseType"
                            label="type"
                            disable={isAddingTransaction}
                            register={register}
                            error={errors}
                        />

                        <SelectInput
                            options={
                                type === "Income"
                                    ? incomeCategories
                                    : expenseCategories
                            }
                            labelFor="category"
                            label="category"
                            disable={isAddingTransaction}
                            register={register}
                            error={errors}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input
                            label="description"
                            inputType="text"
                            register={register}
                            error={errors}
                            max="20"
                            placeholder="A short simple description..."
                            disable={isAddingTransaction}
                        />

                        <Input
                            label="amount"
                            inputType="number"
                            max=""
                            register={register}
                            error={errors}
                            placeholder="Enter the amount..."
                            disable={isAddingTransaction}
                        />
                    </div>
                    <DateInput
                        today={today}
                        minDate=""
                        label="date"
                        maxDate={today}
                        register={register}
                        error={errors}
                        className="outline-none rounded
                   bg-light-sectionBackground p-2 w-full"
                        disable={isAddingTransaction}
                    />
                    
                    <div className="flex justify-between items-center gap-2">
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
                            onButtonClick={handleSubmit}
                        />
                    </div>
                </form>

*/
