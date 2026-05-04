import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Modal from "../../ui/Modal";
import Button from "./Button";
import DateInput from "./DateInput";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Form from "./Form";

import { useAuth } from "../../contexts/AuthContext";
import { useGetSavings } from "../../hooks/useGetSavings";
import { useUpdateSavings } from "../../hooks/useUpdateSavings";
import { useEditTransaction } from "../../hooks/useEditTransaction";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useToday } from "../../hooks/useDate";
import {
  incomeCategories,
  expenseCategories,
  expenseTypes,
} from "../../data/data";

function TransactionForm({ onCloseForm, isEdit, data }) {
  const { user } = useAuth();
  const { savings } = useGetSavings();
  const { updateSavings } = useUpdateSavings();
  const { today } = useToday();
  const { addTransaction, isAddingTransaction } = useAddTransaction();
  const { editTransaction, isEditingTransaction } = useEditTransaction();

  const isBusy = isAddingTransaction || isEditingTransaction;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit
      ? {
          type: data.type,
          amount: data.amount,
          category: data.category,
          description: data.description,
          date: data.date,
        }
      : {},
  });

  const dataType = watch("type");

  function handleFormSubmit(formData) {
    const { type, amount, category, date, description } = formData;

    if (amount <= 0) {
      toast.error("Amount must be more than zero.");
      return;
    }

    if (isEdit) {
      editTransaction(
        { entries: formData, id: data.id },
        { onSuccess: onCloseForm }
      );
      return;
    }

    const newTransaction = { ...formData, user_id: user?.id };

    addTransaction(newTransaction, {
      onSuccess: ([saved]) => {
        onCloseForm();

        if (saved.type === "expense") return;

        const categorySavings = savings.find(
          (saving) => saving.funded_by === saved.category
        );
        if (!categorySavings) return;

        const { id, percentage, amount_saved } = categorySavings;
        const amountToSave = (percentage / 100) * saved.amount + amount_saved;

        updateSavings({ amountToSave, savingsId: id });
      },
    });
  }

  return (
    <Modal>
      <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 
        bg-light-background dark:bg-dark-background">

        <h2 className="text-xl font-bold text-light-text p-2 mb-2 dark:text-dark-text">
          {isEdit
            ? `Edit ${data.category} ${data.type} transaction`
            : "Add a new transaction"}
        </h2>

        <Form submitFun={handleFormSubmit} handleSubmitFun={handleSubmit}>
          <div className="w-full flex justify-between gap-4">
            <SelectInput
              options={expenseTypes}
              labelFor="expenseType"
              label="type"
              disabled={isBusy}
              register={register}
              error={errors}
              rules={{ required: "Type is required" }}
            />
            <SelectInput
              options={dataType === "income" ? incomeCategories : expenseCategories}
              labelFor="category"
              label="category"
              disabled={isBusy}
              register={register}
              error={errors}
              rules={{ required: "Category is required" }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Input
              name="description"
              label="description"
              inputType="text"
              register={register}
              error={errors}
              placeholder="A short simple description..."
              disabled={isBusy}
              rules={{
                required: "Description is required",
                maxLength: {
                  value: 20,
                  message: "Description must be 20 characters or less",
                },
              }}
            />
            <Input
              name="amount"
              label="amount"
              inputType="number"
              register={register}
              error={errors}
              placeholder="Enter the amount..."
              disabled={isBusy}
              rules={{
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than zero" },
              }}
            />
          </div>

          <DateInput
            name="date"
            label="date"
            minDate=""
            maxDate={today}
            register={register}
            error={errors}
            disabled={isBusy}
            className="outline-none rounded bg-light-sectionBackground 
              dark:bg-dark-sectionBackground dark:text-dark-text p-2 w-full"
          />

          <div className="flex justify-between items-center gap-2">
            <Button
              text="Cancel"
              className="w-32 bg-light-sectionBackground uppercase
                p-2 rounded-md font-bold text-xl"
              disabled={isBusy}
              onButtonClick={onCloseForm}
            />
            <Button
              text={isEdit ? "Edit" : "Add"}
              type="submit"
              disabled={isBusy}
              loader={isBusy}
              className="w-36 bg-light-primaryCTA uppercase p-2
                flex items-center justify-center rounded text-white
                hover:bg-light-secondaryAccent font-bold text-xl
                dark:bg-dark-primaryCTA disabled:opacity-60"
            />
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default TransactionForm;