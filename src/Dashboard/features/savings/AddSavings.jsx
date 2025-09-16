import { useForm } from "react-hook-form";

import RangeSlider from "../Form/RangeSlider";
import SelectInput from "../Form/SelectInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import DateInput from "../Form/DateInput";
import Modal from "../../ui/Modal";

import { incomeCategories } from "../../data/data";
import { useUser } from "../../Hooks/useUser";
import { useAddSavings } from "../../Hooks/useAddSavings";
import { useEditSavings } from "../../Hooks/useEditSavings";
import { useToday } from "../../Hooks/useDate";
import { savingMethods } from "../../data/data";
const AddSavingsForm = ({ onCloseForm, isEdit, data }) => {
    let minDate;

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: isEdit
            ? (() => {
                  const {
                      id,
                      method,
                      title,
                      funded_by,
                      target_amount,
                      start_date,
                      end_date,
                      percentage
                  } = data;
                  minDate = start_date;
                  return {
                      method: method || savingMethods[0].value,
                      name: title,
                      source: funded_by,
                      amount: target_amount,
                      ["Start date"]: start_date,
                      ["Target date"]: end_date,
                      percentage,
                      id
                  };
              })()
            : { method: savingMethods[0].value }
    });

    const { userId } = useUser();
    const { today } = useToday();

    const { addSavings, isAddingSavings } = useAddSavings();
    const { editSavings, isEditingSavings } = useEditSavings();

    const startDate = watch("Start date");
    const savingMethod = watch("method");

    function handleFormSubmit(datas) {
        const id = datas.id;
        const newSavings = {
            title: datas.name,
            target_amount: +datas.amount,
            user_id: userId,
            method: datas.method,
            percentage: +datas.percentage || null,
            funded_by: datas.source || null,
            start_date: datas["Start date"],
            end_date: datas["Target date"],
            is_active: true
        };
        if (isEdit) {
            editSavings(
                { newSavings, id },
                {
                    onSuccess: () => onCloseForm()
                }
            );
        } else {
            addSavings(newSavings, {
                onSuccess: () => onCloseForm()
            });
        }
    }
    const savingsNameRule = {
        required: "Name is required "
    };
    const amountRule = {
        required: "Amount is required.",
        min: { value: 1, message: "Can't be less than 1" }
    };
    return (
        <Modal>
            <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 bg-light-background">
                <h3 className="text-xl font-bold mb-2">
                    {isEdit ? "Edit your savings goal." : "Add a new goal"}
                </h3>

                <form
                    className="flex flex-col gap-1.5"
                    onSubmit={handleSubmit(handleFormSubmit)}
                    noValidate
                >
                    <Input
                        label="savings name"
                        inputType="string"
                        placeholder="Name your savings goal..."
                        disable={isAddingSavings}
                        register={register}
                        rules={savingsNameRule}
                        error={errors}
                    />
                    <Input
                        label="Target amount"
                        inputType="number"
                        placeholder="Target amount..."
                        rules={amountRule}
                        disable={isAddingSavings}
                        register={register}
                        error={errors}
                    />
                    <SelectInput
                        options={savingMethods}
                        labelFor="funded_by"
                        disable={false}
                        label="method"
                        register={register}
                        error={errors}
                    />
                    {savingMethod === "automatic" && (
                        <div className="">
                            <RangeSlider register={register} watch={watch} />
                            <SelectInput
                                options={incomeCategories}
                                labelFor="funded_by"
                                disable={isAddingSavings}
                                label="Source"
                                register={register}
                                error={errors}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <DateInput
                            label="Start date"
                            maxDate=""
                            minDate={isEdit ? minDate : today}
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
