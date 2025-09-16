import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "../../ui/Modal";
import Input from "../Form/Input";
import Button from "../Form/Button";
import DateInput from "../Form/DateInput";
import SelectInput from "../Form/SelectInput";
import TextArea from "../Form/TextArea";

import { useTransactions } from "../../Hooks/useTransactions";
import { getCurrentDate } from "../../Utils/currentDate";
//import { getCurrentDate } from "../../Utils/currentDate";
import { useToday } from "../../Hooks/useDate";

function EditBudgetForm({ data, type, onCloseForm }) {
    const { amount, category, start_date, end_date, notes } = data;

    const { expenseCategories: budgetCategories } = useTransactions();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            amount,
            category,
            description: notes,
            start: start_date,
            end: end_date
        }
    });

    const startDate = watch("start");

    const { today } = useToday();

    const handleFormCancel = () => onCloseForm();

    function handleFormSave(infos) {
        const { amount, category, start, end, description } = infos;

        if (category === "" || +amount === 0 || start === "" || end === "") {
            toast.error("Check your input fields.");
            return;
        }
    }

    return (
        <Modal>
            <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 bg-light-background">
                <h1 className="text-2xl font-bold">Edit {category} budget.</h1>
                <p className="text-sm font-extralight">
                    Update your spending limit for different categories.
                </p>

                <div className="flex items-center justify-center">
                    <div className="h-0.5 w-full bg-light-dividers rounded-md"></div>
                </div>

                <form onSubmit={handleSubmit(handleFormSave)}>
                    <div className="grid grid-cols-2 items-center gap-2 py-3">
                        <div>
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
                                minDate={today}
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
