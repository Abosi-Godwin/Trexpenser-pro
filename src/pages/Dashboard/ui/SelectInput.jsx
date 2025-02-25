const SelectInput =  ({
    options,
    labelFor,
    iniValue,
    valueSetter,
    defOptionVal,
    setDefOption,
    onHandleInputChange,
    contStyle = "",
    labelStyle = "",
    label = "Select category:"
}) => {
    return (
        <div className={contStyle}>
            <label htmlFor={labelFor} className={labelStyle}>
                {label}
            </label>

            <br />

            <select
                name="filteringType"
                id="filteringType"
                value={iniValue}
                onChange={e => onHandleInputChange(e.target.value, valueSetter)}
                className="bg-color-2
                text-color-8 border-none outline-none p-2 rounded"
            >
                {setDefOption && (
                    <option value="" disabled>
                        Select {defOptionVal}
                    </option>
                )}{" "}
                {options.map((option, index) => (
                    <option value={option} key={index}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectInput;
