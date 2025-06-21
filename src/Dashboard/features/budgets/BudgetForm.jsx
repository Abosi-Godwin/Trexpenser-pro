import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTransactions } from "../../Hooks/useTransactions";

import { useUser } from "../../Hooks/useUser";
import { useBudgets } from "../../Hooks/useBudgets";
import { useAddBudget } from "../../Hooks/useAddBudget";

import Modal from "../../ui/Modal";

import Input from "../Form/Input";
import Button from "../Form/Button";
import DateInput from "../Form/DateInput";
import SelectInput from "../Form/SelectInput";
import TextArea from "../Form/TextArea";
function BudgetForm({ onClose }) {
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
    } = useForm();

    const startDate = watch("start");

    const [currentDate, setCurrentDate] = useState("");

    function handleFormCancel() {
        onClose();
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
        addBudget(budgetData);
        
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
    }, [setCurrentDate]);

    return (
        <Modal>
            <div
                className="border-2 border-light-dividers p-3 rounded-md w-4/5
            bg-light-background"
            >
                <div>
                    <h1 className="text-2xl font-bold">Create new budget.</h1>
                    <p className="text-sm font-extralight">
                        Define your spending limit for different categories.
                    </p>
                </div>

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

export default BudgetForm;
