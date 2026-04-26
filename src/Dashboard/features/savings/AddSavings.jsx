 import { useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import RangeSlider from "../Form/RangeSlider";
import SelectInput from "../Form/SelectInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import DateInput from "../Form/DateInput";
import Modal from "../../ui/Modal";
import { dropdownVariants } from "../../Utils/AnimationVariants";
import { incomeCategories, savingMethods } from "../../data/data";
import { useUser } from "../../Hooks/useUser";
import { useAddSavings } from "../../Hooks/useAddSavings";
import { useEditSavings } from "../../Hooks/useEditSavings";
import { useToday } from "../../Hooks/useDate";

const AddSavingsForm = ({ onCloseForm, isEdit, data }) => {
  const editMinDate = useRef(isEdit ? data.start_date : null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit
      ? {
          method: data.method || savingMethods[0].value,
          name: data.title,
          source: data.funded_by,
          amount: data.target_amount,
          "Start date": data.start_date,
          "Target date": data.end_date,
          percentage: data.percentage,
          id: data.id,
        }
      : { method: savingMethods[0].value },
  });

  const { userId } = useUser();
  const { today } = useToday();
  const { addSavings, isAddingSavings } = useAddSavings();
  const { editSavings, isEditingSavings } = useEditSavings();

  const isBusy = isAddingSavings || isEditingSavings;

  const startDate = watch("Start date");
  const savingMethod = watch("method");

  function handleFormSubmit(formData) {
    const newSavings = {
      title: formData.name,
      target_amount: +formData.amount,
      user_id: userId,
      method: formData.method,
      percentage: +formData.percentage || null,
      funded_by: formData.source || null,
      start_date: formData["Start date"],
      end_date: formData["Target date"],
      is_active: true,
    };

    if (isEdit) {
      editSavings(
        { newSavings, id: formData.id },
        { onSuccess: onCloseForm }
      );
      return;
    }

    addSavings(newSavings, { onSuccess: onCloseForm });
  }

  return (
    <Modal>
      <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 
        bg-light-background dark:bg-dark-background dark:text-dark-text">

        <h2 className="text-xl font-bold mb-2">
          {isEdit ? "Edit your savings goal" : "Add a new goal"}
        </h2>

        <form
          className="flex flex-col gap-1.5"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <Input
            name="name"
            label="savings name"
            inputType="text"
            placeholder="Name your savings goal..."
            disabled={isBusy}
            register={register}
            rules={{ required: "Name is required" }}
            error={errors}
          />

          <Input
            name="amount"
            label="Target amount"
            inputType="number"
            placeholder="Target amount..."
            disabled={isBusy}
            register={register}
            error={errors}
            rules={{
              required: "Amount is required",
              min: { value: 1, message: "Can't be less than 1" },
            }}
          />

          <SelectInput
            options={savingMethods}
            labelFor="method"
            label="method"
            disabled={false}
            register={register}
            error={errors}
          />

          <AnimatePresence mode="wait">
            {savingMethod === "automatic" && (
              <motion.div
                key="automatic-section"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <RangeSlider register={register} watch={watch} />
                <SelectInput
                  options={incomeCategories}
                  labelFor="source"
                  label="Source"
                  disabled={isBusy}
                  register={register}
                  error={errors}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-4 py-4">
            <DateInput
              label="Start date"
              maxDate=""
              minDate={isEdit ? editMinDate.current : today}
              register={register}
              disabled={isBusy}
              className="w-full outline-none rounded-md p-2 
                bg-light-sectionBackground dark:bg-dark-sectionBackground 
                dark:text-dark-text"
            />

            <DateInput
              label="Target date"
              maxDate=""
              minDate={startDate}
              disabled={isBusy}
              register={register}
              className="w-full outline-none rounded-md p-2 
                bg-light-sectionBackground dark:bg-dark-sectionBackground 
                dark:text-dark-text"
            />

            <Button
              className="bg-light-sectionBackground dark:bg-dark-sectionBackground 
                rounded font-bold p-2"
              text="Cancel"
              disabled={isBusy}
              onButtonClick={onCloseForm}
            />

            <Button
              type="submit"
              loader={isBusy}
              disabled={isBusy}
              className="bg-light-primaryCTA flex items-center justify-center 
                uppercase p-2 rounded text-white hover:bg-color-5 
                hover:text-color-2 font-bold text-xl 
                dark:bg-dark-primaryCTA disabled:opacity-60"
              text={isEdit ? "Edit" : "Save"}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddSavingsForm;