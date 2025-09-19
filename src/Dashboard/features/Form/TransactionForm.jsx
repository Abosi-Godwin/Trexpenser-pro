import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Modal from "../../ui/Modal";

import Button from "./Button";
import DateInput from "./DateInput";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Form from "./Form";

import { useAuth } from "../../contexts/AuthContext";
import { useGetSavings } from "../../Hooks/useGetSavings";
import { useUpdateSavings } from "../../Hooks/useUpdateSavings";
import { useEditTransaction } from "../../Hooks/useEditTransaction";
import { useAddTransaction } from "../../Hooks/useAddTransaction";
import { useToday } from "../../Hooks/useDate";
import {
    incomeCategories,
    expenseCategories,
    expenseTypes
} from "../../data/data";

function TransactionForm({ onCloseForm, isEdit, data }) {
    const { user } = useAuth();
    const { savings } = useGetSavings();
    const { updateSavings } = useUpdateSavings();

    const { today } = useToday();

    const { addTransaction, isAddingTransaction } = useAddTransaction();

    const { editTransaction, isEditingTransaction } = useEditTransaction();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: isEdit
            ? (() => {
                  const { type, amount, category, description, date } = data;
                  return { type, amount, category, description, date };
              })()
            : null
    });

    const type = watch("type");

    function handleFormSubmit(datas) {
        const { type, amount, category, date, description } = datas;

        if (
            type === "" ||
            type === "select" ||
            category === "" ||
            category === "select" ||
            amount === "" ||
            date === "" ||
            description === ""
        ) {
            toast.error("All inputs are required");
            return;
        }

        const newTransaction = {
            ...datas,
            user_id: user?.id
        };

        if (isEdit) {
            const entries = { ...datas };
            const id = data.id;

            editTransaction(
                { entries, id },
                {
                    onSuccess: () => {
                        onCloseForm();
                    }
                }
            );
            return;
        }

        addTransaction(newTransaction, {
            onSuccess: ([data]) => {
                onCloseForm();

                if (data.type === "expense") return;

                const categorySavings = savings.find(
                    saving => saving.funded_by === data.category
                );

                if (!categorySavings) return;

                const { id, percentage, amount_saved } = categorySavings;

                const amountMade = data.amount;
                const amountToSave =
                    (percentage / 100) * amountMade + amount_saved;
                const savingsId = id;

                updateSavings({ amountToSave, savingsId });
            }
        });
    }

    return (
        <Modal>
            <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 bg-light-background dark:bg-dark-background">
                <h1
                    className="text-xl font-bold text-light-text p-2 mb-2
                dark:text-dark-text"
                >
                    {isEdit
                        ? `Edit ${data.category} ${data.type} transaction.`
                        : "Add a new transaction"}
                </h1>
                <Form
                    submitFun={handleFormSubmit}
                    handleSubmitFun={handleSubmit}
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
                                type === "income"
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
                            disable={
                                isAddingTransaction || isEditingTransaction
                            }
                            onButtonClick={onCloseForm}
                        />
                        <Button
                            text={isEdit ?"Edit": "Add"}
                            disable={
                                isAddingTransaction || isEditingTransaction
                            }
                            loader={isAddingTransaction || isEditingTransaction}
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
