import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Button from "./Inputs/Button.jsx";
import DateInput from "./Inputs/DateInput.jsx";
import Input from "./Inputs/Input.jsx";
import Categories from "./Inputs/Categories.jsx";
import { incomeCategories, expenseCategories } from "../../data/data.js";

import Modal from "./Modal.jsx";

function EditItemsForm({ data, onFormHide, onFormEditted }) {
    const { type, category, description, amount, date } = data;
    const dataId = data?.id;
    const [dataType, setDataType] = useState(type);
    const [dataCategory, setDataCategory] = useState(category);
    const [dataDescription, setDataDescription] = useState(description);
    const [dataAmount, setDataAmount] = useState(amount);
    const [dataDate, setDataDate] = useState(date);

    function handleInputChange(value, setterFunc) {
        setterFunc(value);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (
            dataType === "" ||
            dataCategory === "" ||
            dataDescription === "" ||
            dataAmount === ""
        ) {
            return;
        } else {
            const newExpense = {
                id: dataId,
                description: dataDescription,
                amount: dataAmount,
                date: dataDate,
                category: dataCategory,
                type: dataType
            };
            onFormEditted(newExpense);
            onFormHide();
            setDataDescription("");
            setDataAmount("");
        }
    }
    return (
        dataId && (
            <Modal>
                <div
                    className="w-full h-fit flex items-center flex-col
                justify-center gap-3 bg-color-6 text-color-2 p-2 rounded-md
                md:w-1/2"
                >
                    <div className="w-full">
                        <h1
                            className="text-color-2 text-2xl font-bold flex
                        justify-end"
                            onClick={onFormHide}
                        >
                            <FaTimesCircle />
                        </h1>
                    </div>
                    <div>
                        <div>
                            <h1
                                className="text-xl font-bold text-color-2 p-2u
                            capitalize"
                            >
                                Edit your {dataDescription} {dataType}
                            </h1>
                        </div>
                        <form
                            className="p-3 flex flex-col gap-3
            rounded mt-2.5 text-color-2"
                        >
                            <div className="w-full flex justify-between gap-4">
                                <Categories
                                    options={[dataType]}
                                    iniValue={dataType}
                                    labelFor="expenseType"
                                    labelStyle="text-color-2"
                                    contStyle="row w-50"
                                    label="Type:"
                                    valueSetter={setDataType}
                                    onHandleInputChange={handleInputChange}
                                />
                                <Categories
                                    options={
                                        dataType === "income"
                                            ? incomeCategories
                                            : expenseCategories
                                    }
                                    iniValue={dataCategory}
                                    labelFor="expenseType"
                                    labelStyle="text-color-2"
                                    contStyle="row w-50"
                                    label="Type:"
                                    valueSetter={setDataCategory}
                                    onHandleInputChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <Input
                                    label="description"
                                    inputType="text"
                                    initialValue={dataDescription}
                                    valueSetter={setDataDescription}
                                    onHandleInputChange={handleInputChange}
                                    max="20"
                                    placeholder="A short simple description..."
                                />
                            </div>
                            <div>
                                <Input
                                    label="amount"
                                    inputType="number"
                                    initialValue={dataAmount}
                                    valueSetter={setDataAmount}
                                    max=""
                                    onHandleInputChange={handleInputChange}
                                    placeholder="Enter the amount..."
                                />
                            </div>
                            <div className="flex justify-between gap-2">
                                <DateInput
                                    date={dataDate}
                                    minDate=""
                                    maxDate={dataDate}
                                    setDate={setDataDate}
                                    style="outline-none rounded
                    text-color-8 bg-color-2 p-2"
                                    onHandleDateChange={handleInputChange}
                                />

                                <Button
                                    text="Add"
                                    style="w-32 bg-color-8 uppercase p-3 rounded
                                    text-color-4
        hover:bg-color-4 hover:text-color-2 font-bold text-xl"
                                    onButtonClick={handleFormSubmit}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    );
}
export default EditItemsForm;
