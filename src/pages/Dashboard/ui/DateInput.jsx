const DateInput = ({
    today = "",
    label,
    maxDate,
    minDate,
    setDate,
    disable,
    register,
    className = "",
    onHandleInputChange
}) => {
    
    return (
        <div>
            <label htmlFor="date-input" className="capitalize">
                {label}
            </label>
            <br />
            <input
                type="date"
                id="date-input"
                max={maxDate}
                min={minDate}
                className={className}
                disabled={disable}
                {...register(label)}
            />
        </div>
    );
};

export default DateInput;
