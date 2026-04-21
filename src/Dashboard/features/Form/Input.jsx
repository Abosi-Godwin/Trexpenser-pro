import InputLabel from "./InputLabel";

export default function Input({
    name,
    label,
    placeholder,
    inputType,
    register,
    rules,
    error,
    disabled,
    toggle,
    noLabel,
    onHidePassword,
    className = "bg-light-sectionBackground text-light-text dark:bg-dark-sectionBackground dark:text-dark-text border-none outline-none p-2 rounded"
}) {
    const fieldError = error?.[name];

    return (
        <>
            {!noLabel && (
            
            <InputLabel
    label={label}
    name={name}
    isPassword={name === "password" || name === "confirmPassword"}
    showPassword={toggle}
    onToggle={onHidePassword}
/> 
            )}

            <input
                id={name}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
                {...register(name, rules)}
            />

            {fieldError && (
                <p className="text-red-500 text-sm mt-1">
                    {fieldError.message}
                </p>
            )}
        </>
    );
}
