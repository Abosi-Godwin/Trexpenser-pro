import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../../services/Supabase";
import Button from "./Button";
import Input from "./Input";

const UpdatePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm({ mode: "all" });

    const newPassword = watch("newPassword");

    const submitFunc = async ({ currentPassword, newPassword }) => {
        setLoading(true);
        setServerError(null);
        setSuccess(false);

        // Verify current password by re-authenticating
        const {
            data: { user }
        } = await supabase.auth.getUser();
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: currentPassword
        });

        if (signInError) {
            setServerError("Current password is incorrect.");
            setLoading(false);
            return;
        }

        // Update to new password
        const { error: updateError } = await supabase.auth.updateUser({
            password: newPassword
        });

        setLoading(false);

        if (updateError) {
            setServerError(updateError.message);
            return;
        }

        setSuccess(true);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(submitFunc)}
            className="flex flex-col gap-3 py-3"
        >
            <h2 className="font-bold text-xl">Change Password</h2>

            <Input
                name="currentPassword"
                inputType="password"
                placeholder="Enter your current password..."
                label="Current password"
                register={register}
                error={errors}
                rules={{
                    required: "Current password is required"
                }}
            />

            <Input
                name="newPassword"
                inputType="password"
                placeholder="Enter your new password..."
                label="New password"
                register={register}
                error={errors}
                rules={{
                    required: "New password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                }}
            />

            <Input
                name="confirmPassword"
                inputType="password"
                placeholder="Confirm your new password..."
                label="Confirm password"
                register={register}
                error={errors}
                rules={{
                    required: "Please confirm your new password",
                    validate: value =>
                        value === newPassword || "Passwords do not match"
                }}
            />

            {serverError && (
                <p className="text-red-500 text-sm">{serverError}</p>
            )}

            {success && (
                <p className="text-green-500 text-sm font-semibold">
                    ✓ Password updated successfully.
                </p>
            )}

            <Button
                text={loading ? "Updating..." : "Update password"}
                type="submit"
                disabled={loading}
                className="bg-light-primaryCTA text-white px-4 py-2 rounded-md 
          font-bold text-sm disabled:opacity-60 w-fit"
            />
        </form>
    );
};

export default UpdatePasswordForm;
