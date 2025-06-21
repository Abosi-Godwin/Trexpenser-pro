import { FaEyeSlash, FaEye } from "react-icons/fa6";

import { useAuth } from "../../contexts/AuthContext";

const InputLabel = ({ label, inputType, toggle, hidePassword }) => {
    const { isSigningUp } = useAuth();

    return inputType !== "password" ? (
        <label htmlFor={label} className="capitalize font-bold">
            {label}
        </label>
    ) : (
        <div
            className="flex justify-between items-center">
            <label htmlFor={label} className="capitalize font-bold">
                {label}
            </label>
            <div className="p-2" disabled={isSigningUp} onClick={hidePassword}>
                {!toggle ? <FaEyeSlash /> : <FaEye />}
            </div>
        </div>
    );
};
export default InputLabel;
