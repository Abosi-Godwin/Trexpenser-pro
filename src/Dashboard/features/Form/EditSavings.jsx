import { useForm } from "react-hook-form";

import RangeSlider from "../Form/RangeSlider";
import SelectInput from "../Form/SelectInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import RadioButton from "../Form/RadioButton";
import DateInput from "../Form/DateInput";
import Modal from "../../ui/Modal";
import Form from "./Form";

import { incomeCategories } from "../../data/data";

import { useEditSavings } from "../../Hooks/useEditSavings";
import { useToday } from "../../Hooks/useDate";
const EditSavings = ({ data, onCloseForm }) => {
  
    const {
        id,
        user_id,
        title,
        target_amount,
        start_date,
        percentage,
        funded_by,
        end_date,
        method
    } = data;
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            savingsType: method,
            amount: target_amount,
            name: title,
            percentage,
            Source: funded_by,
            "Start date": start_date,
            "Target date": end_date
        }
    });

    const { editSavings, isEditingSavings } = useEditSavings();

    const startDate = watch("Start date");
    const savingMethod = watch("savingsType");

    function handleFormSubmit(datas) {
        //   console.log(datas);
        const newSavings = {
            title: datas.name,
            target_amount: +datas.amount,
            user_id,
            method: datas.savingsType.toLowerCase(),
            percentage: +datas.percentage || null,
            funded_by: datas.Source,
            start_date: datas["Start date"],
            end_date: datas["Target date"],
            is_active: true
        };

        editSavings({newSavings,id}, {
            onSuccess: () => onCloseForm()
        });
    }

    return (
        <Modal>
            <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 bg-light-background">
                <h3 className="text-xl font-bold mb-2">
                    Edit {title.toLowerCase()}
                </h3>

                <Form
                    submitFun={handleFormSubmit}
                    handleSubmitFun={handleSubmit}
                >
                    <RadioButton
                        disable={isEditingSavings}
                        register={register}
                        error={errors}
                        watch={watch}
                    />
                    <Input
                        label="Goal name"
                        inputType="string"
                        placeholder="Name your savings goal..."
                        disable={isEditingSavings}
                        register={register}
                        error={errors}
                    />
                    <RangeSlider
                        register={register}
                        watch={watch}
                        show={savingMethod === "manual"}
                    />
                    <div
                        className="text-color-8 grid w-full gap-3
                        grid-cols-2"
                    >
                        <SelectInput
                            options={incomeCategories}
                            labelFor="funded_by"
                            disable={
                                isEditingSavings || savingMethod === "manual"
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
                                disable={isEditingSavings}
                                register={register}
                                error={errors}
                            />
                        </div>

                        <DateInput
                            label="Start date"
                            maxDate=""
                            minDate={start_date}
                            register={register}
                            disable={isEditingSavings}
                            className="w-full outline-none rounded-md p-2"
                        />

                        <DateInput
                            label="Target date"
                            maxDate=""
                            minDate={startDate}
                            disable={isEditingSavings}
                            register={register}
                            className="w-full outline-none rounded-md p-2"
                        />

                        <Button
                            className="bg-light-sectionBackground rounded "
                            text="Cancel"
                            onButtonClick={onCloseForm}
                        />
                        <Button
                            loader={isEditingSavings}
                            className="bg-light-primaryCTA flex items-center
                            justify-center uppercase p-2 rounded
                            text-white
        hover:bg-color-5 hover:text-color-2 font-bold text-xl"
                            text="Save"
                            onButtonClick={handleSubmit}
                        />
                    </div>
                </Form>
            </div>
        </Modal>
    );
};
export default EditSavings;
