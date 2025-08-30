import { useForm } from "react-hook-form";

import Modal from "../../ui/Modal";

import Button from "./Button";
import DateInput from "./DateInput";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Form from "./Form";

import { useToday } from "../../Hooks/useDate";

import { useEditTransaction } from "../../Hooks/useEditTransaction";
import {
    incomeCategories,
    expenseCategories,
    expenseTypes
} from "../../data/data";

const EditTransaction = ({ data, onCloseForm }) => {
  

    const { category, type, description, date, amount, id } = data;

    const { editTransaction, isEditingTransaction } = useEditTransaction();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: { type, category, description, date, amount }
    });
    const { today } = useToday();
    const currentType = watch("type") ?? type;

    const handleFormSubmit = entries => {
        editTransaction(
            { entries, id },
            {
                onSuccess: () => {
                    onCloseForm();
                }
            }
        );
    };
    return (
        <Modal>
            <div className="bg-white p-3 rounded-md w-4/5">
                <div>
                    <h1 className="text-2xl font-bold">Edit transaction </h1>
                </div>

                <Form
                    submitFun={handleFormSubmit}
                    handleSubmitFun={handleSubmit}
                >
                    <div className="w-full flex justify-between gap-4">
                        <SelectInput
                            options={expenseTypes}
                            labelFor="expenseType"
                            label="type"
                            disable={false}
                            register={register}
                            error={errors}
                        />

                        <SelectInput
                            options={
                                currentType === "income"
                                    ? incomeCategories
                                    : expenseCategories
                            }
                            labelFor="category"
                            label="category"
                            disable={false}
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
                            disable={false}
                        />

                        <Input
                            label="amount"
                            inputType="number"
                            max=""
                            register={register}
                            error={errors}
                            placeholder="Enter the amount..."
                            disable={false}
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
                        disable={false}
                    />
                    <div className="flex justify-between items-center gap-2">
                        <Button
                            text="Cancel"
                            disable={false}
                            loader={false}
                            className="w-32 bg-light-sectionBackground uppercase
                            p-2 rounded-md font-bold text-xl"
                            onButtonClick={onCloseForm}
                        />
                        <Button
                            text="Add"
                            disable={false}
                            loader={false}
                            className="w-36 bg-light-primaryCTA uppercase p-2
                            flex items-center justify-center
                            rounded text-white
        hover:bg-light-secondaryAccent font-bold text-xl
        dark:bg-dark-primaryCTA"
                            onButtonClick={handleSubmit(handleFormSubmit)}
                        />
                    </div>
                </Form>
            </div>
        </Modal>
    );
};

export default EditTransaction;
