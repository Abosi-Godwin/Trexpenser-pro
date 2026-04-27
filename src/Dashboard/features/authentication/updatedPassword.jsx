import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { supabase } from "../../services/Supabase";
import { Logo } from "../../ui/Logo";
import Input from "../Form/Input";
import Button from "../Form/Button";
import Form from "../Form/Form";
import Loader from "../../ui/Loader";
import { slideUpVariant } from "../../Utils/AnimationVariants";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [validSession, setValidSession] = useState(false);
    const [checking, setChecking] = useState(true);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const newPassword = watch("newPassword");

    useEffect(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(event => {
            if (event === "PASSWORD_RECOVERY") {
                setValidSession(true);
            } else {
                setValidSession(false);
            }
            setChecking(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (!checking && !validSession) {
            toast.error("Invalid or expired reset link.");
            navigate("/", { replace: true });
        }
    }, [checking, validSession, navigate]);

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
        navigate("/login", { replace: true });
    };

    if (checking) return <Loader />;
    if (!validSession) return null;

    return (
        <motion.div
            variants={slideUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-light-background rounded-md p-4 flex flex-col
        gap-4 w-full max-w-md py-6"
        >
            <Logo />

            <div>
                <h2 className="text-xl font-bold">Update your password.</h2>
                <p className="text-sm mb-2">
                    Enter and confirm your new password.
                </p>
                <hr />
            </div>

            <Form handleSubmitFun={handleSubmit} submitFun={handleFormSubmit}>
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
                            message: "Password must be at least 6 characters."
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
                            value === newPassword || "Passwords do not match."
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
    );
};

export default UpdatePassword;
