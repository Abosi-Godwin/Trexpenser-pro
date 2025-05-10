const DateInput = ({
    today = "",
    label,
    maxDate,
    minDate,
    setDate,
    disable,
    className = "",
    onHandleDateChange
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
                onChange={e => onHandleDateChange(e.target.value, label)}
            />
        </div>
    );
};

export default DateInput;
