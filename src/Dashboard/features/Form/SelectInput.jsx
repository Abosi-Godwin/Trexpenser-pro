const SelectInput = ({
    options,
    labelFor,
    disable,
    label,
    register = () => {},
    errors,
    onHandleChange,
    selected = ""
}) => {
    const name = label.split(" ").at(-1).toLowerCase();

    return (
        <div>
            <label htmlFor={labelFor} className="font-bold capitalize">
                {label}
            </label>
            <br />
            <select
                name={name}
                id={name}
                disabled={disable}
                className="bg-light-sectionBackground border-none outline-none
                p-2 rounded w-full
                  dark:bg-dark-sectionBackground dark:text-dark-text"
                {...register(name)}
                error={errors}
                onChange={onHandleChange}
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
