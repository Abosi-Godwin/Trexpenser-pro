import PropTypes from "prop-types";

const DateInput = ({
    date = "",
    label,
    maxDate,
    minDate,
    setDate,
    style = "",
    onHandleDateChange
}) => {
    return (
        <div>
            <label htmlFor="date-input">{label}</label>
            <input
                type="date"
                id="date-input"
                value={date}
                max={maxDate}
                min={minDate}
                className={style}
                onChange={e => onHandleDateChange(e.target.value, setDate)}
            />
        </div>
    );
};

DateInput.propTypes = {
    date: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.string,
    maxDate: PropTypes.string,
    minDate: PropTypes.string,
    setDate: PropTypes.func,
    onHandleDateChange: PropTypes.func
};

export default DateInput;
