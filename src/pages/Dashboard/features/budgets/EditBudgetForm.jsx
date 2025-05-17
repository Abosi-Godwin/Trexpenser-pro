import { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import DateInput from "../../ui/DateInput";
//import Categories from "./Inputs/Categories.jsx";
import Modal from "../../ui/Modal";

function EditBudgetForm({ data, onFormClose, onFormSubmit }) {
    

    const budgetCategory = data.category;
    const [amount, setAmount] = useState(data.amount);
    const [startDate, setStartDate] = useState(data.startDate);
    const [endDate, setEndDate] = useState(data.endDate);
    //const [currentDate, setCurrentDate] = useState("");

    const inputValue = event => event.target.value;

    /* function handleCategoryChange(e) {
        setBudgetCategory(inputValue(e));
    }
    */
    function handleAmountChange(e) {
        setAmount(+inputValue(e));
    }
    function handleStartDateChange(e) {
        setStartDate(inputValue(e));
    }
    function handleEndDateChange(e) {
        setEndDate(inputValue(e));
    }

    function handleFormSave(e) {
        e.preventDefault();

        if (budgetCategory === "" || +amount === 0) return;

        /* const budgetToEdit = allBudgets.find(
            data => data.category === budgetCategory
        );
*/
        const budgetData = {
            category: budgetCategory,
            amount: +amount,
            startDate,
            endDate,
            Id: data.Id
        };
        onFormSubmit(budgetData);
        onFormClose();
    }
    return (
        <Modal>
            <div
                className="p-2 bg-color-8 rounded
    text-color-3 w-full md:w-1/2 md:p-4"
            >
                <div className="py-2">
                    <h1 className="text-xl font-bold text-color-3">
                        Edit your {budgetCategory} buget tracking
                    </h1>
                </div>
                <div>
                    <form>
                        <div className="flex justify-between items-center gap-4">
                            <div>
                                <label htmlFor="BudgetAmount">
                                    New amount:
                                </label>{" "}
                                <br />
                                <Input
                                    inputType="number"
                                    initialValue={amount}
                                    max=""
                                    onHandleInputChange={handleAmountChange}
                                    placeholder="Enter a new amount..."
                                />
                            </div>
                        </div>
                        <div className="py-4">
                            <h1 className="capitalize text-xl">
                                Edit the time frame
                            </h1>
                            <div
                                className="flex justify-between items-center gap-4
                        py-2"
                            >
                                <div className="">
                                    <label htmlFor="">Start:</label> <br />
                                    <DateInput
                                        date={startDate}
                                        setDate={setStartDate}
                                        maxDate=""
                                        minDate={startDate}
                                        style="w-full outline-none rounded
                    text-color-8 bg-color-2 p-2"
                                        onHandleDateChange={
                                            handleStartDateChange
                                        }
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="">End:</label> <br />
                                    <DateInput
                                        date={endDate}
                                        setDate={setEndDate}
                                        maxDate=""
                                        minDate={startDate}
                                        style="w-full outline-none rounded
                    text-color-8 bg-color-2 p-2"
                                        onHandleDateChange={handleEndDateChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between py-2">
                            <Button
                                text="Cancel"
                                style="w-32 bg-color-2 uppercase p-2 rounded text-color-8
        hover:bg-color-6 hover:text-color-2 font-bold text-xl"
                                onButtonClick={onFormClose}
                            />

                            <Button
                                text="Edit"
                                style="w-32 bg-color-6 uppercase p-2 rounded
                            text-color-2
        hover:bg-red-200 hover:text-color-2 font-bold text-xl"
                                onButtonClick={handleFormSave}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default EditBudgetForm;
