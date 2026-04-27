import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { supabase } from "../../services/Supabase";
import { useState } from "react";
import toast from "react-hot-toast";

import { Logo } from "../../ui/Logo";
import Input from "../Form/Input";
import Button from "../Form/Button";
import Form from "../Form/Form";
import { slideUpVariant } from "../../Utils/AnimationVariants";

const UpdatePassword = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const newPassword = watch("newPassword");

    const handleFormSubmit = async ({ newPassword }) => {
        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        setLoading(false);

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Password updated successfully!");
    };

    return (
        <div
            className="flex flex-1
      items-center justify-center"
        >
            <motion.div
                variants={slideUpVariant}
                initial="hidden"
                animate="visible"
                className="bg-light-background rounded-md p-4 flex flex-col
          gap-4 md:w-5/12 py-6"
            >
                <Logo />

                <div>
                    <h2 className="text-xl font-bold">Update your password.</h2>
                    <p className="text-sm mb-2">
                        Enter and confirm your new password.
                    </p>
                    <hr />
                </div>

                <Form
                    handleSubmitFun={handleSubmit}
                    submitFun={handleFormSubmit}
                >
                    <Input
                        name="newPassword"
                        label="New password"
                        inputType="password"
                        placeholder="Enter your new password..."
                        disabled={loading}
                        register={register}
                        error={errors}
                        rules={{
                            required: "New password is required.",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters."
                            }
                        }}
                    />
                    <Input
                        name="confirmPassword"
                        label="Confirm password"
                        inputType="password"
                        placeholder="Confirm your new password..."
                        disabled={loading}
                        register={register}
                        error={errors}
                        rules={{
                            required: "Please confirm your new password.",
                            validate: value =>
                                value === newPassword ||
                                "Passwords do not match."
                        }}
                    />
                    <Button
                        text={loading ? "Updating..." : "Update password"}
                        type="submit"
                        disabled={loading}
                        loader={loading}
                        className="bg-light-primaryCTA text-white flex mt-2
              items-center justify-center font-extrabold rounded-md 
              p-2 uppercase w-full hover:bg-light-secondaryAccent
              disabled:opacity-60"
                    />
                </Form>
            </motion.div>
        </div>
    );
};

export default UpdatePassword;
