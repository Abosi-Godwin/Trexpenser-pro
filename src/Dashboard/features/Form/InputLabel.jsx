 import { FaEyeSlash, FaEye } from "react-icons/fa6";

const InputLabel = ({
    label,
    name,
    isPassword,
    showPassword,
    onToggle
}) => {
    return (
        <div className="flex justify-between items-center">
            <label htmlFor={name} className="capitalize font-bold">
                {label}
            </label>

            {isPassword && (
                <button
                    type="button"
                    onClick={onToggle}
                    className="p-2"
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
            )}
        </div>
    );
};

export default InputLabel;