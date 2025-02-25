
import PropTypes from "prop-types";

Input.propTypes = {
    max: PropTypes.string,
    label: PropTypes.string,
    inputType: PropTypes.string,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    valueSetter: PropTypes.func,
    onHandleInputChange: PropTypes.func,
};




export default function Input({
    max = "",
    label = "",
    placeholder = "",
    initialValue = "",
    inputType,
    valueSetter,
    onHandleInputChange
}) {
    return (
        <div>
            <label htmlFor={label} className=" capitalize">
                {" "}
                {label}
            </label>
            <input
                id={label}
                maxLength={max}
                type={inputType}
                value={initialValue}
                placeholder={placeholder}
                onChange={e =>
                    onHandleInputChange(
                        inputType === "number"
                            ? +e.target.value
                            : e.target.value,
                        valueSetter
                    )
                }
                className="w-full
                text-color-8 bg-color-2 border-none outline-none p-2 rounded
                placeholder:text-color-4"
            />
        </div>
    );
}
