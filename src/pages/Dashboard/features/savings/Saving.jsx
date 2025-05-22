import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import ApexRadialChart from "../../ui/ApexRadialChart";
import { formatCurrency, formatDate } from "../../../../Utils/CustomMethods";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
const Saving = ({ savingsData }) => {
    const {
        id,
        title,
        is_active,
        target_amount,
        amount_saved,
        end_date,
        start_date,
        method,
        percentage,
        funded_by
    } = savingsData;

    const { updateSavings, isUpdatingSavings, updatedSavings } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const saved = Math.floor((amount_saved / target_amount) * 100);

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
        <div className="py-3">
            <div className="flex justify-between items-center mb-1.5">
                <h1 className="font-medium  text-xl">{title}</h1>
                <span
                    className="ring-1 ring-light-mainBackground
                    bg-light-sectionBackground
                    dark:ring-dark-mainBackground
                    dark:bg-dark-sectionBackground p-1
                rounded-md text-sm"
                >
                    {is_active ? "Active" : "Not active"}
                </span>
            </div>
            <div className="grid grid-cols-[2fr_1fr] pt-2">
                <ul className="">
                    <li className="flex justify-centehr gap-3">
                        <span className="font-bold">Target:</span>
                        <span className="">
                            {" "}
                            {formatCurrency(target_amount)}
                        </span>
                    </li>
                    <li className="">
                        <span className="font-bold">Saved</span>
                        <span>
                          
                            {formatCurrency(amount_saved)}
                        </span>
                    </li>
                    <li className="">
                        <span className="font-bold">From:</span>
                        <span className=""> {formatDate(start_date)}</span>
                    </li>
                    <li className="">
                        <span className="font-bold">To:</span>
                        <span className=""> {formatDate(end_date)}</span>
                    </li>
                    <li className="">
                        <span className="font-bold">Method:</span>
                        <span className=""> {method}</span>
                    </li>
                </ul>
                <div className="flex items-end justify-end">
                    <ApexRadialChart percentage={saved} />
                </div>
            </div>
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
                            disable={isUpdatingSavings}
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
                            {percentage}% of each {funded_by} income will be
                            added to this savings goal.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Saving;
