import SavingGoals from "../features/savings/SavingGoals";

const SavingsPage = () => {
    return (
        <div className="w-full bg-color-2 h-screen pt-24 py-6 px-2">
            <div className="flex flex-col gap-3">
                <h1 className="uppercase text-2xl font-extrabold text-color-5">
                    Your saving {<br />} Goals
                </h1>
                <p className="text-color-7 font-bold mb-2 text-sm">
                    Achieve your financial dreams with tailored savings goals.
                </p>
            </div>
            <SavingGoals />
        </div>
    );
};

export default SavingsPage;
