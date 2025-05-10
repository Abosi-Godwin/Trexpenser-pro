import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import toast from "react-hot-toast";
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
        method
    } = savingsData;

    const { updateSavings, isUpdatingSavings, updatedSavings } = useAuth();

    const percentage = Math.floor((amount_saved / target_amount) * 100);

    const [savingsAmount, setSavingsAmount] = useState();

    const handleInputChange = e => {
        setSavingsAmount(e);
    };

    const handleSavings = () => {
        if (!savingsAmount) {
            toast.error("Amount can't be empty ");
            return;
        }

        const amountToSave = savingsAmount + +amount_saved;
        const savingsId = id;

        updateSavings({ amountToSave, savingsId });
        setSavingsAmount("")
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
                        <span className="">
                            {" "}
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
                    <ApexRadialChart percentage={percentage} />
                </div>
            </div>
            <div className="pt-4 flex">
                {method === "manual" ? (
                    <>
                        <Input
                            inputType="number"
                            initialValue={savingsAmount}
                            onHandleInputChange={handleInputChange}
                            placeholder="Add to your savings..."
                            disable={isUpdatingSavings}
                            className="w-full bg-light-sectionBackground
                            border-none outline-none p-2 rounded-l-md
                            dark:bg-dark-sectionBackground"
                        />
                        <Button
                            text="Save"
                            onButtonClick={handleSavings}
                            className="rounded-r-md
                        font-bold bg-light-primaryCTA text-white p-2
                        dark:bg-dark-primaryCTA"
                        />
                    </>
                ) : (
                    <>
                        <p
                            className="p-2 bg-light-sectionBackground rounded-md
                        dark:bg-dark-sectionBackground"
                        >
                            {20}% of each income amount will be added to this
                            savings goal.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Saving;
