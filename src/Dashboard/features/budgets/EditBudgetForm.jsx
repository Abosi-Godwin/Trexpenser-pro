/*import { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import DateInput from "../../ui/DateInput";

import Modal from "../../ui/Modal";

function EditBudgetForm({ data, onFormClose, onFormSubmit }) {
    const budgetCategory = data.category;
    const [amount, setAmount] = useState(data.amount);
    const [startDate, setStartDate] = useState(data.startDate);
    const [endDate, setEndDate] = useState(data.endDate);

    const inputValue = event => event.target.value;

    function handleAmountChange(e) {
        setAmount(+inputValue(e));
    }
    function handleStartDateChange(e) {
        setStartDate(inputValue(e));
    }
    function handleEndDateChange(e) {
        setEndDate(inputValue(e));
    }

    function handleFormSave(e) {
        e.preventDefault();

        if (budgetCategory === "" || +amount === 0) return;

        const budgetData = {
            category: budgetCategory,
            amount: +amount,
            startDate,
            endDate,
            Id: data.Id
        };
        onFormSubmit(budgetData);
        onFormClose();
    }
    return (
        <Modal>
            <div
                className="p-2 bg-color-8 rounded
    text-color-3 w-full md:w-1/2 md:p-4"
            >
                <div className="py-2">
                    <h1 className="text-xl font-bold text-color-3">
                        Edit your {budgetCategory} buget tracking
                    </h1>
                </div>
                <div>
                    <form>
                        <div className="flex justify-between items-center gap-4">
                            <div>
                                <label htmlFor="BudgetAmount">
                                    New amount:
                                </label>{" "}
                                <br />
                                <Input
                                    inputType="number"
                                    initialValue={amount}
                                    max=""
                                    onHandleInputChange={handleAmountChange}
                                    placeholder="Enter a new amount..."
                                />
                            </div>
                        </div>
                        <div className="py-4">
                            <h1 className="capitalize text-xl">
                                Edit the time frame
                            </h1>
                            <div
                                className="flex justify-between items-center gap-4
                        py-2"
                            >
                                <div className="">
                                    <label htmlFor="">Start:</label> <br />
                                    <DateInput
                                        date={startDate}
                                        setDate={setStartDate}
                                        maxDate=""
                                        minDate={startDate}
                                        style="w-full outline-none rounded
                    text-color-8 bg-color-2 p-2"
                                        onHandleDateChange={
                                            handleStartDateChange
                                        }
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="">End:</label> <br />
                                    <DateInput
                                        date={endDate}
                                        setDate={setEndDate}
                                        maxDate=""
                                        minDate={startDate}
                                        style="w-full outline-none rounded
                    text-color-8 bg-color-2 p-2"
                                        onHandleDateChange={handleEndDateChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between py-2">
                            <Button
                                text="Cancel"
                                style="w-32 bg-color-2 uppercase p-2 rounded text-color-8
        hover:bg-color-6 hover:text-color-2 font-bold text-xl"
                                onButtonClick={onFormClose}
                            />

                            <Button
                                text="Edit"
                                style="w-32 bg-color-6 uppercase p-2 rounded
                            text-color-2
        hover:bg-red-200 hover:text-color-2 font-bold text-xl"
                                onButtonClick={handleFormSave}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default EditBudgetForm;

*/

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "../../ui/Modal";
import Input from "../Form/Input";
import Button from "../Form/Button";
import DateInput from "../Form/DateInput";
import SelectInput from "../Form/SelectInput";
import TextArea from "../Form/TextArea";

import { useTransactions } from "../../Hooks/useTransactions";
import { useUser } from "../../Hooks/useUser";
import { useBudgets } from "../../Hooks/useBudgets";
import { useAddBudget } from "../../Hooks/useAddBudget";

function EditBudgetForm({ data, type, onCloseForm }) {
    console.log(data);
    const { expenseCategories: budgetCategories } = useTransactions();

    const { user } = useUser();
    const userId = user.id;

    const { budgets } = useBudgets(userId);
    const {
        addBudget,
        addedBudget,
        isAddingBudget,
        isAddingBudgetError,
        isAddingBudgetSucces
    } = useAddBudget();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm({defaultValues:{}});

    const startDate = watch("start");

    const [currentDate, setCurrentDate] = useState("");

    function handleFormCancel() {
        onCloseForm();
    }

    const doNothing = () => {
        console.log("Existing category");
    };

    function submitBudget(
        category,
        amount,
        start,
        end,
        userId,
        isActive,
        description
    ) {
        const budgetData = {
            category,
            amount,
            start_date: start,
            end_date: end,
            status: isActive,
            user_id: userId,
            notes: description || "No description added."
        };
        addBudget(budgetData, {
            onSuccess: onCloseForm()
        });
    }

    function handleFormSave(infos) {
        const { amount, category, start, end, description } = infos;

        if (category === "" || +amount === 0 || start === "" || end === "") {
            toast.error("Check your input fields.");
            return;
        }

        const existingCategory = (selectedCategory, initialBudgets) =>
            initialBudgets.some(budget => budget.category === selectedCategory);

        const hasBudget = existingCategory(category, budgets);

        const isActive = end >= currentDate ? "active" : "expired";

        hasBudget
            ? toast.error(`${category} is already being tracked.`)
            : submitBudget(
                  category,
                  +amount,
                  start,
                  end,
                  userId,
                  isActive,
                  description
              );
    }

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setCurrentDate(today);
    }, []);

    return (
        <Modal>
            <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 bg-light-background">
                <h1 className="text-2xl font-bold">Edit budget.</h1>
                <p className="text-sm font-extralight">
                    Update your spending limit for different categories.
                </p>

                <div className="flex items-center justify-center">
                    <div className="h-0.5 w-full bg-light-dividers rounded-md"></div>
                </div>

                <form onSubmit={handleSubmit(handleFormSave)}>
                    <div className="grid grid-cols-2 items-center gap-2 py-3">
                        <div className="">
                            <SelectInput
                                options={budgetCategories}
                                labelFor="budgetType"
                                label="category"
                                register={register}
                                error={errors}
                            />
                        </div>
                        <div>
                            <Input
                                inputType="number"
                                label="Limit amount"
                                register={register}
                                error={errors}
                                placeholder="Enter the amount..."
                                className="bg-light-sectionBackground
                                border-none outline-none p-2 w-full
                        rounded-md
                              "
                            />
                        </div>
                    </div>
                    <div className="py-2">
                        <h1 className="capitalize font-bold">Time frame</h1>
                        <div className="grid grid-cols-2 items-center gap-2 py-3">
                            <DateInput
                                label="start"
                                maxDate=""
                                minDate={currentDate}
                                className="w-full outline-none border-none rounded-md  p-2 bg-light-sectionBackground"
                                register={register}
                            />
                            <DateInput
                                label="end"
                                maxDate=""
                                minDate={startDate}
                                className="w-full outline-none rounded p-2 bg-light-sectionBackground"
                                register={register}
                            />
                        </div>
                    </div>

                    <TextArea
                        label="description"
                        register={register}
                        error={errors}
                    />

                    <div className="pt-3 flex items-center justify-center gap-2">
                        <Button
                            text="Cancel"
                            className="w-32 bg-light-sectionBackground uppercase
                            p-2 rounded-md font-bold text-xl"
                            onButtonClick={handleFormCancel}
                        />

                        <Button
                            text="Save"
                            className="w-36 bg-light-primaryCTA uppercase p-2
                            flex items-center justify-center
                            rounded text-white
        hover:bg-light-secondaryAccent font-bold text-xl
        dark:bg-dark-primaryCTA"
                            onButtonClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default EditBudgetForm;
