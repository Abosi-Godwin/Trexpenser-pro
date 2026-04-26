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
import { useEditBudget } from "../../Hooks/useEditBudget";
import { useToday } from "../../Hooks/useDate";

function BudgetForm({ onCloseForm, isEdit, data }) {
  const { expenseCategories: budgetCategories } = useTransactions();
  const { user } = useUser();
  const { budgets } = useBudgets(user?.id);
  const { today } = useToday();
  const { addBudget, isAddingBudget } = useAddBudget();
  const { editBudget, isEditingBudget } = useEditBudget();

  const isBusy = isAddingBudget || isEditingBudget;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit
      ? {
          amount: data.amount,
          category: data.category,
          description: data.notes,
          start: data.start_date,
          end: data.end_date,
        }
      : {},
  });

  const startDate = watch("start");
  const endDate = watch("end");

  function handleFormSave(formData) {
    const { amount, category, start, end, description } = formData;

    if (isEdit) {
      const newBudget = {
        category,
        amount: +amount,
        start_date: start,
        end_date: end,
        notes: description || "No description added.",
      };
      editBudget(
        { newBudget, id: data.id },
        { onSuccess: onCloseForm }
      );
      return;
    }

    // Check for duplicate category
    const alreadyTracked = budgets.some(
      (budget) => budget.category === category
    );
    if (alreadyTracked) {
      toast.error(`${category} is already being tracked.`);
      return;
    }

    const isActive = end >= today ? "active" : "expired";

    addBudget(
      {
        category,
        amount: +amount,
        start_date: start,
        end_date: end,
        status: isActive,
        user_id: user?.id,
        notes: description || "No description added.",
      },
      { onSuccess: onCloseForm }
    );
  }

  return (
    <Modal>
      <div className="border-2 border-light-dividers p-3 rounded-md w-4/5 
        bg-light-background dark:bg-dark-background dark:text-dark-text">

        <h2 className="text-2xl font-bold">
          {isEdit ? "Edit budget" : "Create new budget"}
        </h2>
        <p className="text-sm font-extralight">
          Define your spending limit for different categories.
        </p>

        <hr className="my-2 border-light-dividers" />

        <form
          onSubmit={handleSubmit(handleFormSave)}
          className="flex flex-col gap-3"
        >
          <div className="grid grid-cols-2 items-center gap-2 py-3">
            <SelectInput
              options={budgetCategories}
              labelFor="budgetType"
              label="category"
              disabled={isBusy}
              register={register}
              error={errors}
              rules={{ required: "Category is required" }}
            />
            <Input
              name="amount"
              inputType="number"
              label="Limit amount"
              disabled={isBusy}
              register={register}
              error={errors}
              placeholder="Enter the amount..."
              rules={{
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than zero" },
              }}
              className="bg-light-sectionBackground dark:bg-dark-sectionBackground
                border-none outline-none p-2 w-full rounded-md"
            />
          </div>

          <div>
            <h3 className="capitalize font-bold mb-2">Time frame</h3>
            <div className="grid grid-cols-2 items-center gap-2">
              <DateInput
                label="start"
                maxDate=""
                minDate={isEdit ? "" : today}
                disabled={isBusy}
                register={register}
                error={errors}
                rules={{ required: "Start date is required" }}
                className="w-full outline-none border-none rounded-md p-2 
                  bg-light-sectionBackground dark:bg-dark-sectionBackground
                  dark:text-dark-text"
              />
              <DateInput
                label="end"
                maxDate=""
                minDate={startDate || today}
                disabled={isBusy}
                register={register}
                error={errors}
                rules={{ required: "End date is required" }}
                className="w-full outline-none rounded p-2 
                  bg-light-sectionBackground dark:bg-dark-sectionBackground
                  dark:text-dark-text"
              />
            </div>
          </div>

          <TextArea
            label="description"
            disabled={isBusy}
            register={register}
            error={errors}
          />

          <div className="pt-3 flex items-center justify-center gap-2">
            <Button
              text="Cancel"
              disabled={isBusy}
              className="w-32 bg-light-sectionBackground dark:bg-dark-sectionBackground 
                uppercase p-2 rounded-md font-bold text-xl"
              onButtonClick={onCloseForm}
            />
            <Button
              text={isEdit ? "Update" : "Save"}
              type="submit"
              disabled={isBusy}
              loader={isBusy}
              className="w-36 bg-light-primaryCTA uppercase p-2
                flex items-center justify-center rounded text-white
                hover:bg-light-secondaryAccent font-bold text-xl
                dark:bg-dark-primaryCTA disabled:opacity-60"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default BudgetForm;