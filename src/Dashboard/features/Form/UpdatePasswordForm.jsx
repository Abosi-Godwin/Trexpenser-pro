import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
const UpdatePasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "all" });

    const submitFunc = userInputs => {};

    return (
        <form
            onSubmit={handleSubmit(submitFunc)}
            className="flex flex-col gap-3 py-3"
        >
            <h1 className="font-bold text-xl">Change password</h1>
            <Input
                inputType="password"
                placeholder="Enter your current password..."
                label="current password"
                className="p-3 rounded-md outline-0 border"
                register={register}
                error={errors}
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                }}
            />
            <Input
                inputType="password"
                placeholder="Enter your new password..."
                label="new password"
                className="p-3 rounded-md outline-0 border"
                register={register}
                error={errors}
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                }}
            />
            <Input
                inputType="password"
                placeholder="Confirm your new password..."
                label="confirm password"
                className="p-3 rounded-md outline-0 border"
                register={register}
                error={errors}
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                }}
            />
        </form>
    );
};

export default UpdatePasswordForm;
