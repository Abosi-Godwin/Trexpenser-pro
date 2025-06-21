import { useState } from "react";

import SavingGoals from "../features/savings/SavingGoals";
import AddSavingsForm from "../features/savings/AddSavings";
import Button from "../features/Form/Button";

const SavingsPage = () => {
    const [openForm, setOpenForm] = useState(false);

    const handleForm = () => setOpenForm(prev => !prev);
    
    return (
        <>
            <div
                className="flex flex-col gap-3 bg-light-cardBackground p-2
            rounded-t-md border-b-2 border-b-light-divider
            dark:bg-dark-cardBackground dark:border-b-dark-divider"
            >
                <div className="flex justify-between items-center">
                    <h1 className="uppercase text-2xl font-extrabold text-color-5">
                        Your saving {<br />} Goals
                    </h1>
                    <Button
                        text="Add savings"
                        className="bg-light-primaryCTA
                    rounded-md text-white p-2 font-bold"
                        onButtonClick={handleForm}
                    />
                </div>
                <p className="text-color-7 font-bold mb-2 text-sm">
                    Achieve your financial dreams with tailored savings goals.
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
