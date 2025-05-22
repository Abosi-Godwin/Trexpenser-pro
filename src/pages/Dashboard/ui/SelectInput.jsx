const SelectInput = ({
    options,
    labelFor,
    disable,
    label,
    register,
    error
}) => {
    return (
        <div>
            <label htmlFor={labelFor} className="font-bold capitalize">
                {label}
            </label>
            <br />
            <select
                name="filteringType"
                id="filteringType"
                className="bg-light-sectionBackground border-none outline-none p-2 rounded"
                disabled={disable}
                {...register(label)}
            >
                {options.map((option, index) => (
                    <option value={option} key={index}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
