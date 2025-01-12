import { useState } from "react";

import formatCurrency from "./Libs/CurrencyFormater.js";
import Input from "./Inputs/Input.jsx";
import Button from "./Inputs/Button.jsx";
import ProgressBar from "@ramonak/react-progress-bar";

function Saving({ savingsData, currentDate }) {
    const isNotExpired = currentDate <= savingsData.endDate;
    const isNotCompleted = savingsData.currentAmount < savingsData.targetAmount;
    const [amountToAdd, setAmountToAdd] = useState();
    function handleInputChange(value, valueSetter) {
        valueSetter(value);
    }
    return (
        <>
            <div
                className="bg-color-3 p-4 rounded-lg text-color-3 font-bold
            flex flex-col gap-3"
            >
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-color-6">
                        {savingsData.name}
                    </h2>
                    <div>
                        <span
                            className="bg-color-6 text-color-2 text-sm
                    rounded p-0.5"
                        >
                            {isNotExpired && isNotCompleted
                                ? "Active"
                                : "Expired"}
                        </span>
                    </div>
                </div>
                <div className="bg-color-6 p-2 rounded flex flex-col gap-0.5">
                    <div>
                        <h4>
                            Savings type:{" "}
                            {savingsData.savingsType.toUpperCase()}
                        </h4>
                    </div>
                    <div>
                        <h4>
                            Amount saved:
                            {" " + formatCurrency(savingsData.currentAmount)}
                        </h4>

                        <h4>
                            Target amount:
                            {" " + formatCurrency(savingsData.targetAmount)}
                        </h4>
                    </div>
                    <div>
                        <h4>
                            Start date:
                            {" " + savingsData.startDate}
                        </h4>

                        <h4>
                            End date:
                            {" " + savingsData.endDate}
                        </h4>
                    </div>
                </div>
                <div className="text-color-6">
                    <h2>Progress</h2>
                    <ProgressBar
                        completed={savingsData.currentAmount}
                        maxCompleted={savingsData.targetAmount}
                        bgColor="#9190e9"
                        baseBgColor="#f0f2fd"
                        customLabel={`${Math.trunc(
                            (savingsData.currentAmount /
                                savingsData.targetAmount) *
                                100
                        )}%`}
                        height={15}
                        labelSize={10}
                    />
                </div>
                {savingsData.savingsType === "automatic" ? (
                    <div className="bg-color-6 text-color-2 p-2 rounded">
                        <p>
                            {savingsData.percentage}% of every income will be
                            added to this savings {savingsData.frequency}.
                        </p>
                    </div>
                ) : (
                    <div className="text-color-6">
                        <label htmlFor="addToSavings">Add to savings</label>
                        <div
                            className="w-full flex justify-between
                    gap-2"
                        >
                            <div className="w-4/5">
                                <Input
                                    inputType="number"
                                    initialValue={amountToAdd}
                                    max=""
                                    onHandleInputChange={e =>
                                        handleInputChange(
                                            e.target.value,
                                            setAmountToAdd
                                        )
                                    }
                                    placeholder="Enter the amount..."
                                />
                            </div>
                            <div
                                className="w-1/5 flex items-center
                            justify-center"
                            >
                                <Button
                                    text="Add"
                                    style="w-full bg-color-6 uppercase p-1
                            text-color-2 rounded
        hover:bg-color-5 hover:text-color-2 font-bold text-xl"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Saving;
