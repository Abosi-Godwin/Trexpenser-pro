import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { isFuture, isToday, isPast } from "date-fns";
import toast from "react-hot-toast";


import ApexRadialChart from "../Charts/ApexRadialChart";
import MenuCard from "../../ui/MenuCard";
import Input from "../Form/Input";
import Button from "../Form/Button";

import { useAuth } from "../../contexts/AuthContext";
import { useUpdateSavings } from "../../Hooks/useUpdateSavings";
import { formatCurrency, formatDate } from "../../Utils/CustomMethods";

const SavingsContext = createContext();

const useSavingsContext = () => {
    const context = useContext(SavingsContext);
    if (!context) {
        console.error("No context found");
        return;
    }
    return context;
};
const Saving = ({ savingsData, children }) => {
    const {
        title,
        is_active,
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

    const notStarted = isFuture(new Date(start_date));
    const haveStarted = isToday(new Date(start_date)) || isPast(start_date);
    const havePassed = isPast(new Date(end_date));
    const haveCompleted = amount_saved >= target_amount;

    if (notStarted) {
        isActive = "pending";
    }
    if (haveStarted) {
        isActive = "active";
    }
    if (havePassed) {
        isActive = "expired";
    }
    if (haveCompleted) {
        isActive = "fullfiled";
    }

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
                target_amount
            }}
        >
            <div className="py-3">{children}</div>
        </SavingsContext.Provider>
    );
};

const SavingsHeader = ({ children }) => {
    const { title, isActive } = useSavingsContext();

    return (
        <div className="flex justify-between items-center gap-2 mb-1.5">
            <h1 className="text-xl font-bold whitespace-pre-wrap">{title}</h1>
            <div className="flex justify-between gap-2">
                <span
                    className={`capitalize ring-1 ring-light-mainBackground
                    bg-light-sectionBackground
                    dark:ring-dark-mainBackground
                    dark:bg-dark-sectionBackground p-1
                rounded-md text-sm ${isActive === "expired" && "bg-red-300"}
                ${isActive === "active" && "bg-green-100"}`}
                >
                    {isActive}
                </span>
                {children}
            </div>
        </div>
    );
};

const SavingsAction = () => {
    const { savingsData } = useSavingsContext();

    return (
        <MenuCard data={savingsData} type="savings">
            <MenuCard.Icon />
            <MenuCard.Options />
        </MenuCard>
    );
};

const SavingsInfo = () => {
    const {
        savingsData,
        target_amount,
        amount_saved,
        start_date,
        end_date,
        method
    } = useSavingsContext();

    const saved = Math.floor((amount_saved / target_amount) * 100);
    return (
        <div className="grid grid-cols-[2fr_1fr] pt-2">
            <ul>
                <li className="flex justify-centehr gap-3">
                    <span className="font-bold">Target: </span>
                    <span>{formatCurrency(target_amount)}</span>
                </li>
                <li>
                    <span className="font-bold">Saved: </span>
                    <span>{formatCurrency(amount_saved)}</span>
                </li>
                <li>
                    <span className="font-bold">From:</span>
                    <span className=""> {formatDate(start_date)}</span>
                </li>
                <li>
                    <span className="font-bold">To:</span>
                    <span> {formatDate(end_date)}</span>
                </li>
                <li>
                    <span className="font-bold">Method:</span>
                    <span className="capitalize"> {method}</span>
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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const {
        savingsData,
        method,
        percentage,
        funded_by,
        id,
        amount_saved,
        isActive
    } = useSavingsContext();

    const handleSavings = savingsAmount => {
        const { amount } = savingsAmount;

        if (!amount) {
            toast.error("Amount can't be empty ");
            return;
        }

        const amountToSave = +amount + +amount_saved;
        const savingsId = id;

        updateSavings({ amountToSave, savingsId });
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
                        inputType="number"
                        placeholder="Add to your savings..."
                        label="amount"
                        disable={isUpdatingSavings || isActive !== "active"}
                        register={register}
                        error={errors}
                        noLabel={true}
                        className="w-full bg-light-sectionBackground
                            border-none outline-none p-2 rounded-l-md
                            dark:bg-dark-sectionBackground"
                    />
                    <Button
                        text="Save"
                        onButtonClick={handleSubmit}
                        loader={isUpdatingSavings}
                        disable={isUpdatingSavings}
                        className="rounded-r-md
                        font-bold bg-light-primaryCTA text-white p-2
                        dark:bg-dark-primaryCTA"
                    />
                </form>
            ) : (
                <>
                    <p
                        className="p-2 bg-light-sectionBackground rounded-md
                        dark:bg-dark-sectionBackground"
                    >
                        {percentage}% of each {funded_by} income will be added
                        to this savings goal.
                    </p>
                </>
            )}
        </div>
    );
};

Saving.Header = SavingsHeader;
Saving.Action = SavingsAction;
Saving.Info = SavingsInfo;
Saving.Form = SavingsForm;

export default Saving;
