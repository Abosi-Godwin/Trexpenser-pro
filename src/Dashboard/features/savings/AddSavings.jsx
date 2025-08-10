import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../Form/Input";
import Button from "../Form/Button";
import RadioButton from "../Form/RadioButton";
import DateInput from "../Form/DateInput";
import Modal from "../../ui/Modal";

import { useAuth } from "../../contexts/AuthContext";
import { useAddSavings } from "../../Hooks/useAddSavings";
import { useToday } from "../../Hooks/useDate";
const AddSavingsForm = ({ onCloseForm }) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { user } = useAuth();
    const { today } = useToday();
    const { addSavings, isAddingSavings, isSuccessful } = useAddSavings();

    const userId = user?.id;

    const [savingsType, setSavingsType] = useState("manual");

    const startDate = watch("Start date");

    function handleInputChange(value) {
        setSavingsType(value);
    }

    function handleFormSubmit(datas) {
        const newSavings = {
            title: datas.name,
            target_amount: +datas.amount,
            user_id: userId,
            method: datas.savingsType.toLowerCase(),
            percentage: +datas.percentage || null,
            funded_by: datas.Source,
            start_date: datas["Start date"],
            end_date: datas["Target date"],
            is_active: true
        };

        addSavings(newSavings,{
          onSucess:    onCloseForm()
        });
    }
    
    return (
        <Modal>
            <div
                className="border-2 border-light-dividers p-3 rounded-md w-4/5 bg-light-background"
            >
                
                <h3 className="text-2xl font-bold text-color-8 mb-2">
                    Add a new savings goal
                </h3>

                <form
                    className="flex flex-col gap-1.5"
                    onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <RadioButton
                        onHandleInputChange={handleInputChange}
                        disable={isAddingSavings}
                        defaultOption={savingsType}
                        register={register}
                        error={errors}
                        watch={watch}
                    />

                    <div
                        className="text-color-8 grid w-full gap-3
                        md:grid-cols-2"
                    >
                        <Input
                            label="Goal name"
                            inputType="string"
                            placeholder="Name your savings goal..."
                            disable={isAddingSavings}
                            register={register}
                            error={errors}
                        />

                        <Input
                            label="Target amount"
                            inputType="number"
                            placeholder="Enter the target amount..."
                            disable={isAddingSavings}
                            register={register}
                            error={errors}
                            onHandleInputChange={handleInputChange}
                        />
                    </div>

                    <div
                        className="grid grid-cols-2 w-full gap-3
                        md:grid-cols-2"
                    >
                        <DateInput
                            label="Start date"
                            maxDate=""
                            minDate={today}
                            register={register}
                            disable={isAddingSavings}
                            className="w-full outline-none rounded-md p-2"
                            onHandleInputChange={handleInputChange}
                        />

                        <DateInput
                            label="Target date"
                            maxDate=""
                            minDate={startDate}
                            disable={isAddingSavings}
                            register={register}
                            className="w-full outline-none rounded-md p-2"
                            onHandleInputChange={handleInputChange}
                        />
                    </div>

                    <div
                        className="grid w-full gap-3 grid-cols-2
                        md:grid-cols-2"
                    >
                        <Button
                            className="bg-light-sectionBackground rounded "
                            text="Cancel"
                            onButtonClick={onCloseForm}
                        />
                        <Button
                            loader={isAddingSavings}
                            className="bg-light-primaryCTA flex items-center
                            justify-center uppercase p-2 rounded
                            text-white
        hover:bg-color-5 hover:text-color-2 font-bold text-xl"
                            text="Save"
                            onButtonClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};
export default AddSavingsForm;
