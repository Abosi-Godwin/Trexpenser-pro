import InputLabel from "./InputLabel";

export default function Input({
    label,
    placeholder,
    inputType,
    register,
    rules,
    error,
    disable,
    toggle,
    noLabel,
    onHidePassword,
    onHandleInputChange = () => {},
    className = "w-full bg-light-sectionBackground border-none outline-none p-2 rounded"
}) {
    return (
        <>
            {!noLabel && (
                <InputLabel
                    label={label}
                    inputType={inputType}
                    toggle={toggle}
                    hidePassword={onHidePassword}
                />
            )}
            <input
                id={label}
                type={inputType}
                placeholder={placeholder}
                disabled={disable}
                className={className}
                {...register(label, rules)}
                onChange={e =>
                    onHandleInputChange(
                        label,
                        inputType === "number"
                            ? +e.target.value
                            : e.target.value
                    )
                }
            />
             {error[label.split(" ").at(-1)] && (
                <p className="text-red-500 text-sm mt-1">
                    {error[label.split(" ").at(-1)].message}
                </p>
            )}
        </>
    );
}
