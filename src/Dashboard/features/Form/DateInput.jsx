import { useToday } from "../../Hooks/useDate";

const DateInput = ({
    label,
    maxDate,
    minDate,
    setDate,
    disable,
    register,
    className = ""
}) => {
    const inputId = `date-input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
    const { today } = useToday();
    return (
        <div>
            <label htmlFor={inputId} className="capitalize">
                {label}
            </label>
            <br />
            <input
                type="date"
                id={inputId}
                name={label}
                max={maxDate}
                min={minDate}
                defaultValue={today}
                className={className}
                disabled={disable}
                {...register(label)}
            />
        </div>
    );
};

export default DateInput;
