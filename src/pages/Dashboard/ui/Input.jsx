export default function Input({
    max = "",
    label = "",
    placeholder = "",
    initialValue = "",
    inputType,
    disable = false,
    onHandleInputChange,
    className = "w-full bg-light-sectionBackground border-none outline-none p-2 rounded"
}) {
    return (
        <>
            <label htmlFor={label} className=" capitalize">
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
                        label
                    )
                }
                disabled={disable}
                className={className}
            />
        </>
    );
}
