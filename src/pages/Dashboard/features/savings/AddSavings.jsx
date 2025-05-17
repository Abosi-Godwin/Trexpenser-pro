import { useEffect } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import RadioButton from "../../ui/RadioButton";
import DateInput from "../../ui/DateInput";
import SelectInput from "../../ui/SelectInput";

import { useReducerFunc } from "../../../../Hooks/useReducerFunc";

const savingFrequencyOptions = [
    "Daily",
    "Weekly",
    "Bi-Weekly",
    "Monthly",
    "Quarterly",
    "Semi-Annually",
    "Annually"
];

const savingsTypes = ["Manual", "Automatic"];
const fields = {
    savingsType: savingsTypes[0],
    savingsGoalName: "",
    targetAmount: "",
    startDate: "",
    targetDate: "",
    initialAmount: "",
    savingPercent: "",
    frequency: savingFrequencyOptions[0],
};

const AddSavingsForm = ({ onCloseForm }) => {
    const { states, inputChange } = useReducerFunc(fields);

    const {
        savingsType,
        savingsGoalName,
        targetAmount,
        startDate,
        targetDate,
        initialAmount,
        savingPercent,
        frequency,
        currentDate
    } = states;

    function handleInputChange(type, value) {
        console.log(states);
        inputChange(type, value);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
    }

    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];
        inputChange("date", currentDate);
    }, []);

    return (
        <Modal>
            <div
                className="p-2 rounded-md
            bg-light-background"
            >
                <h3 className="text-2xl font-bold text-color-8 mb-2">
                    Add a new savings goal
                </h3>

                <form className="flex flex-col gap-3">
                    <RadioButton
                        onHandleInputChange={handleInputChange}
                        defaultOption={savingsType}
                    />

                    <div
                        className="text-color-8 grid w-full gap-3
                        md:grid-cols-2"
                    >
                        <Input
                            label="Goal name"
                            inputType="string"
                            placeholder="Name your savings goal..."
                            initialValue={savingsGoalName}
                            onHandleInputChange={handleInputChange}
                        />

                        <Input
                            label="Target amount"
                            inputType="number"
                            placeholder="Enter the target amount..."
                            initialValue={targetAmount}
                            onHandleInputChange={handleInputChange}
                        />
                    </div>

                    <div
                        className="text-color-8 grid w-full gap-3
                        md:grid-cols-2"
                    >
                        <div>
                            <DateInput
                                label="Start date"
                                date={startDate}
                                maxDate=""
                                minDate={currentDate}
                                className="w-full outline-none rounded
                    text-color-8 bg-color-2 p-2"
                                onHandleInputChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <DateInput
                                label="Target date"
                                date={targetDate}
                                maxDate=""
                                minDate={startDate}
                                className="w-full outline-none rounded
                    text-color-8 bg-color-2 p-2"
                                onHandleInputChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {savingsType === "Automatic" && (
                        <div
                            className="text-color-8 grid w-full gap-3
                        md:grid-cols-2"
                        >
                            <div>
                                <label htmlFor="savingFrequency">
                                    Saving Frequency
                                </label>
                                <select
                                    name="savingFrequency"
                                    id="savingFrequency"
                                    value={frequency}
                                    onChange={handleInputChange}
                                    className="w-full bg-color-2
                text-color-8 bg-color-2 border-none outline-none p-2 rounded"
                                >
                                    {savingFrequencyOptions.map(
                                        (option, ind) => (
                                            <SelectInput
                                                option={option}
                                                key={ind}
                                            />
                                        )
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="savingPercent">
                                    Percentage to deduct: {savingPercent}%
                                </label>
                                <input
                                    id="savingPercent"
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={savingPercent}
                                    onChange={handleInputChange}
                                    className="w-full
h-2 bg-color-6 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    )}
                    <div
                        className="grid w-full gap-3 grid-cols-2
                        md:grid-cols-2"
                    >
                        <Button
                            className="bg-light-sectionBackground rounded "
                            text="Cancel"
                            onButtonClick={onCloseForm}
                        />
                        <Button
                            className="w-32 bg-color-6 uppercase p-2 rounded
                            text-color-2
        hover:bg-color-5 hover:text-color-2 font-bold text-xl"
                            text="Save"
                            onButtonClick={handleFormSubmit}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};
export default AddSavingsForm;
