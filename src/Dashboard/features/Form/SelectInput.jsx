const SelectInput = ({
    options,
    labelFor,
    disable,
    label,
    onHandleChange,
    selected = ""
}) => {
    return (
        <div>
            <label htmlFor={labelFor} className="font-bold capitalize">
                {label}
            </label>
            <br />
            <select
                name={label.toLowerCase()}
                id={label.toLowerCase()}
                className="bg-light-sectionBackground border-none outline-none
                p-2 rounded w-full
                  dark:bg-dark-sectionBackground dark:text-dark-text"
                disabled={disable}
                onChange={onHandleChange}
                defaultValue={selected || options[0]}
            >
                {options.map((option, index) => (
                    <option value={option.value} key={index}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
