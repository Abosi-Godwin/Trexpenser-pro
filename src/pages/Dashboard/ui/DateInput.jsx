const DateInput = ({
    today = "",
    label,
    maxDate,
    minDate,
    setDate,
    disable,
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
                value={today}
                max={maxDate}
                min={minDate}
                className={className}
                disabled={disable}
                onChange={e => onHandleInputChange(label, e.target.value)}
            />
        </div>
    );
};

export default DateInput;
