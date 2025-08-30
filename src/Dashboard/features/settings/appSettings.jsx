import { useForm } from "react-hook-form";

import Button from "../Form/Button";
import Input from "../Form/Input";

const AppSettings = () => {
    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({ mode: "all" });

    return (
        <div className="bg-light-cardBackground flex-col rounded-md p-3">
            <h1 className="text-2xl font-bold">App settings.</h1>
        </div>
    );
};
export default AppSettings;
