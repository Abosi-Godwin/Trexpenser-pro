import { useForm } from "react-hook-form";

import RangeSlider from "../Form/RangeSlider";
import SelectInput from "../Form/SelectInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import RadioButton from "../Form/RadioButton";
import DateInput from "../Form/DateInput";
import Modal from "../../ui/Modal";

import { incomeCategories } from "../../data/data";
import { useAuth } from "../../contexts/AuthContext";
import { useAddSavings } from "../../Hooks/useAddSavings";
import { useToday } from "../../Hooks/useDate";
const AddSavingsForm = ({ onCloseForm }) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            savingsType: "Manual"
        }
    });

    const { user } = useAuth();
    const { today } = useToday();
    const { addSavings, isAddingSavings } = useAddSavings();

    const userId = user?.id;

    const startDate = watch("Start date");
    const savingMethod = watch("savingsType");

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

        addSavings(newSavings, {
            onSuccess: () => onCloseForm()
            
        });
    }

    return (
        <Modal>
            <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 bg-light-background">
                <h3 className="text-2xl font-bold text-color-8 mb-2">
                    Add a new savings goal
                </h3>

                <form
                    className="flex flex-col gap-1.5"
                    onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <RadioButton
                        disable={isAddingSavings}
                        register={register}
                        error={errors}
                        watch={watch}
                    />
                    <Input
                        label="Goal name"
                        inputType="string"
                        placeholder="Name your savings goal..."
                        disable={isAddingSavings}
                        register={register}
                        error={errors}
                    />
                    <RangeSlider
                        register={register}
                        watch={watch}
                        show={savingMethod === "Manual"}
                    />
                    <div
                        className="text-color-8 grid w-full gap-3
                        grid-cols-2"
                    >
                        <SelectInput
                            options={incomeCategories}
                            labelFor="funded_by"
                            disable={
                                isAddingSavings || savingMethod === "Manual"
                            }
                            label="Source"
                            register={register}
                            error={errors}
                        />
                        <div className="overflow-hidden">
                            <Input
                                label="Target amount"
                                inputType="number"
                                placeholder="Target amount..."
                                disable={isAddingSavings}
                                register={register}
                                error={errors}
                            />
                        </div>

                        <DateInput
                            label="Start date"
                            maxDate=""
                            minDate={today}
                            register={register}
                            disable={isAddingSavings}
                            className="w-full outline-none rounded-md p-2"
                        />

                        <DateInput
                            label="Target date"
                            maxDate=""
                            minDate={startDate}
                            disable={isAddingSavings}
                            register={register}
                            className="w-full outline-none rounded-md p-2"
                        />

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
