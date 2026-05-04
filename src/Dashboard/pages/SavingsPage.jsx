import { useState } from "react";

import SavingGoals from "../features/savings/SavingGoals";
import AddSavingsForm from "../features/savings/AddSavings";
import Button from "../features/Form/Button";

import { useGetSavings } from "../hooks/useGetSavings";
import { useCurrency } from "../hooks/useCurrency";

const SavingsPage = () => {
    const [openForm, setOpenForm] = useState(false);

    const handleForm = () => setOpenForm(prev => !prev);
    const { totalSaved } = useGetSavings();
    const { format } = useCurrency();
    return (
        <>
            <div
                className="flex flex-col gap-3 bg-light-cardBackground p-2
    rounded-t-md border-b-2 border-b-light-divider
    dark:bg-dark-cardBackground dark:border-b-dark-divider
    dark:text-dark-text"
            >
                <div className="flex justify-between items-center">
                    <h1 className="uppercase text-2xl font-extrabold">
                        {format(totalSaved)}
                    </h1>
                    <Button
                        text="Add savings"
                        className="bg-light-primaryCTA dark:bg-dark-primaryCTA
        rounded-md text-white p-2 font-bold"
                        onButtonClick={handleForm}
                    />
                </div>
                <p className="font-bold mb-2 text-sm">
                    In your savings balance.
                </p>
            </div>
            {openForm && <AddSavingsForm onCloseForm={handleForm} />}
            <div
                className="bg-light-cardBackground overflow-hidden rounded-b-md p-2
            dark:bg-dark-cardBackground"
            >
                <SavingGoals showTitle={false} showAction={true} />
            </div>
        </>
    );
};

export default SavingsPage;
