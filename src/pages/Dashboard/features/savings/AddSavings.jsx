import { useState, useEffect } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import RadioButton from "../../ui/RadioButton";
import DateInput from "../../ui/DateInput";
import SelectInput from "../../ui/SelectInput";
//import Saving from "../../components/Saving.jsx";

const savingFrequencyOptions = [
    "Daily",
    "Weekly",
    "Bi-Weekly",
    "Monthly",
    "Quarterly",
    "Semi-Annually",
    "Annually"
];

const AddSavingsForm = ({ onCloseForm }) => {
    const savingsTypes = ["Manual", "Automatic"];
    const [savingsType, setSavingsType] = useState(savingsTypes[0]);
    const [savingsGoalName, setSavingsGoalName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const initialAmount = 0;
    const [startDate, setStartDate] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [savingPercent, setSavingPercent] = useState(1);
    const [frequency, setFrequency] = useState();

    const [currentDate, setCurrentDate] = useState("");
    function handleFormSubmit(e) {
        e.preventDefault();
        savingsType === "Manual"
            ? console.log({
                  savingsGoalName,
                  targetAmount,
                  initialAmount,
                  startDate,
                  targetDate
              })
            : console.log(savingsType);
    }
    function handleInputChange(e, setFunc) {
        setFunc(e);
    }
    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];
        //setDate(currentDate);
        setCurrentDate(currentDate);
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
                        valSetter={setSavingsType}
                    />

                    <div
                        className="text-color-8 grid w-full gap-3
                        md:grid-cols-2"
                    >
                        <div>
                            <Input
                                label="Goal name"
                                inputType="string"
                                placeholder="Name your savings goal..."
                                initialValue={savingsGoalName}
                                onHandleInputChange={e =>
                                    handleInputChange(
                                        e.target.value,
                                        setSavingsGoalName
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Input
                                label="Target amount"
                                inputType="number"
                                placeholder="Enter the target amount..."
                                initialValue={targetAmount}
                                onHandleInputChange={e =>
                                    handleInputChange(
                                        e.target.value,
                                        setTargetAmount
                                    )
                                }
                            />
                        </div>
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
                                setDate={setStartDate}
                                style="w-full outline-none rounded
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
                                setDate={setTargetDate}
                                style="w-full outline-none rounded
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
                                    onChange={e =>
                                        handleInputChange(
                                            e.target.value,
                                            setFrequency
                                        )
                                    }
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
                                    onChange={e =>
                                        handleInputChange(
                                            e.target.value,
                                            setSavingPercent
                                        )
                                    }
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
                            style="w-32 bg-color-6 uppercase p-2 rounded
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
