import PropTypes from "prop-types";
import { useState } from "react";
RadioButton.propTypes = {
  onHandleInputChange: PropTypes.func,
valSetter: PropTypes.func,
  
}


function RadioButton({ onHandleInputChange, valSetter }) {
    const [selectedValue, setSelectedValue] = useState("Manual");
    function handleSelectedValue(e) {
        const value = e.target.value;
        setSelectedValue(value);
        onHandleInputChange(value, valSetter);
    }
    return (
        <div>
            <h3 className="text-lg font-bold text-color-8">Savings type?</h3>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                    <input
                        type="radio"
                        id="Manual"
                        name="savingsType"
                        value="Manual"
                        className="hidden peer"
                        checked={selectedValue === "Manual"}
                        onChange={handleSelectedValue}
                    />
                    <label
                        htmlFor="Manual"
                        className="inline-flex items-center justify-between
                        w-full p-2 text-color-8 bg-color-2 border
                        border-color-8         rounded-md cursor-pointer
                        peer-checked:text-color-2 peer-checked:bg-color-8"
                    >
                        <div className="block">
                            <div className="w-full text-lg font-semibold">
                                Manual <i className="text-sm">(Default)</i>
                            </div>
                            <div className="w-full">
                                You will manually add some funds.
                            </div>
                        </div>
                    </label>
                </li>

                <li>
                    <input
                        type="radio"
                        id="automatic"
                        name="savingsType"
                        value="Automatic"
                        className="hidden peer"
                        checked={selectedValue === "Automatic"}
                        onChange={handleSelectedValue}
                    />
                    <label
                        htmlFor="automatic"
                        className="inline-flex items-center justify-between
                        w-full p-2 text-color-8 bg-color-2 border
                        border-color-8         rounded-md cursor-pointer
                        peer-checked:text-color-2 peer-checked:bg-color-8
                      "
                    >
                        <div className="block">
                            <div className="w-full text-lg font-semibold">
                                Automatic
                            </div>
                            <div className="w-full">
                                Automatically saved from income.
                            </div>
                        </div>
                    </label>
                </li>
            </ul>
        </div>
    );
}
export default RadioButton;
