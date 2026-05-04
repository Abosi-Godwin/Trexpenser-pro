import { createContext, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { isFuture, isToday, isPast } from "date-fns";
import toast from "react-hot-toast";

import ApexRadialChart from "../Charts/ApexRadialChart";
import MenuCard from "../../ui/MenuCard";
import Input from "../Form/Input";
import Button from "../Form/Button";

import { useUpdateSavings } from "../../hooks/useUpdateSavings";
import { useCurrency } from "../../hooks/useCurrency";
import { formatDate } from "../../utils/CustomMethods";

const SavingsContext = createContext();

const useSavingsContext = () => {
    const context = useContext(SavingsContext);
    if (!context) {
        throw new Error(
            "useSavingsContext must be used within a <Saving /> provider"
        );
    }
    return context;
};

const Saving = ({ savingsData, children }) => {
    const {
        title,
        start_date,
        end_date,
        target_amount,
        amount_saved,
        method,
        percentage,
        funded_by,
        id
    } = savingsData;

    let isActive;
    if (isFuture(new Date(start_date))) isActive = "pending";
    if (isToday(new Date(start_date)) || isPast(new Date(start_date)))
        isActive = "active";
    if (isPast(new Date(end_date))) isActive = "expired";
    if (amount_saved >= target_amount) isActive = "fulfilled";

    const portalRef = useRef(null);

    return (
        <SavingsContext.Provider
            value={{
                savingsData,
                isActive,
                title,
                method,
                percentage,
                funded_by,
                id,
                start_date,
                end_date,
                amount_saved,
                target_amount,
                portalRef
            }}
        >
            <div className="py-3">{children}</div>
        </SavingsContext.Provider>
    );
};

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 ring-yellow-200",
    active: "bg-green-100 text-green-800 ring-green-200",
    expired: "bg-red-100 text-red-800 ring-red-200",
    fulfilled: "bg-indigo-100 text-indigo-800 ring-indigo-200"
};

const SavingsHeader = ({ children }) => {
    const { title, isActive } = useSavingsContext();

    return (
        <div className="flex justify-between items-center gap-2 mb-1.5">
            <h2 className="text-xl font-bold whitespace-pre-wrap">{title}</h2>
            <div className="flex justify-between gap-2">
                <span
                    className={`capitalize ring-1 p-1 rounded-md text-sm
            ${statusStyles[isActive] ?? "bg-light-sectionBackground ring-light-mainBackground"}`}
                >
                    {isActive}
                </span>
                {children}
            </div>
        </div>
    );
};

const SavingsAction = () => {
    const { savingsData, id, portalRef } = useSavingsContext();

    return (
        <MenuCard data={savingsData} type="savings" portalRef={portalRef}>
            <MenuCard.Toggle id={id} />
            <MenuCard.Options id={id} />
        </MenuCard>
    );
};

const SavingsInfo = () => {
    const {
        target_amount,
        amount_saved,
        start_date,
        end_date,
        method,
        portalRef
    } = useSavingsContext();
    const { format } = useCurrency();
    const saved = Math.floor((amount_saved / target_amount) * 100);

    return (
        <div className="grid grid-cols-[2fr_1fr] pt-2" ref={portalRef}>
            <ul className="space-y-1">
                <li className="flex gap-3">
                    <span className="font-bold">Target:</span>
                    <span>{format(target_amount)}</span>
                </li>
                <li className="flex gap-3">
                    <span className="font-bold">Saved:</span>
                    <span>{format(amount_saved)}</span>
                </li>
                <li className="flex gap-3">
                    <span className="font-bold">From:</span>
                    <span>{formatDate(start_date)}</span>
                </li>
                <li className="flex gap-3">
                    <span className="font-bold">To:</span>
                    <span>{formatDate(end_date)}</span>
                </li>
                <li className="flex gap-3">
                    <span className="font-bold">Method:</span>
                    <span className="capitalize">{method}</span>
                </li>
            </ul>
            <div className="flex items-end justify-end">
                <ApexRadialChart percentage={saved} />
            </div>
        </div>
    );
};

const SavingsForm = () => {
    const { updateSavings, isUpdatingSavings } = useUpdateSavings();
    const { method, percentage, funded_by, id, amount_saved, isActive } =
        useSavingsContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const notActive = isActive !== "active";

    const getPlaceholderText = state =>
        state === "pending" ? "Wait until the start date..." : "Completed!";

    const handleSavings = ({ amount }) => {
        const amountToSave = +amount + +amount_saved;
        updateSavings({ amountToSave, savingsId: id });
        reset();
    };

    return (
        <div className="pt-4">
            {method === "manual" ? (
                <form
                    onSubmit={handleSubmit(handleSavings)}
                    className="pt-4 flex"
                >
                    <Input
                        name="amount"
                        inputType="number"
                        placeholder={
                            isActive === "active"
                                ? "Add to your savings..."
                                : getPlaceholderText(isActive)
                        }
                        label="amount"
                        noLabel={true}
                        disabled={isUpdatingSavings || notActive}
                        register={register}
                        error={errors}
                        rules={{
                            required: "Amount is required.",
                            min: {
                                value: 1,
                                message: "Amount must be more than zero."
                            }
                        }}
                        className="w-full bg-light-sectionBackground border-none 
              outline-none p-2 rounded-l-md dark:bg-dark-sectionBackground"
                    />
                    <Button
                        text="Save"
                        type="submit"
                        loader={isUpdatingSavings}
                        disabled={isUpdatingSavings || notActive}
                        className="rounded-r-md font-bold bg-light-primaryCTA 
              text-white p-2 dark:bg-dark-primaryCTA disabled:opacity-60"
                    />
                </form>
            ) : (
                <p
                    className="p-2 bg-light-sectionBackground rounded-md
          dark:bg-dark-sectionBackground"
                >
                    {percentage}% of each {funded_by} income will be added to
                    this savings goal.
                </p>
            )}

            {isActive === "fulfilled" && (
                <p
                    className="p-2 mt-3 text-center rounded-md 
          bg-light-sectionBackground dark:bg-dark-sectionBackground"
                >
                    🎉 Congratulations on completing this goal!
                </p>
            )}
        </div>
    );
};

Saving.Header = SavingsHeader;
Saving.Action = SavingsAction;
Saving.Info = SavingsInfo;
Saving.Form = SavingsForm;

export default Saving;
