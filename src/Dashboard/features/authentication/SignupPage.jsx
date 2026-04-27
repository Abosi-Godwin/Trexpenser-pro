import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { slideUpVariant } from "../../Utils/AnimationVariants";
import { useSignUp } from "../../Hooks/useSignUp";

import Button from "../Form/Button";
import GoogleBtn from "../Form/GoogleBtn";
import Input from "../Form/Input";

const SignupPage = () => {
    const { signUp, isSigningUp, emailSent } = useSignUp();
    const [submittedEmail, setSubmittedEmail] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [visibility, setVisibility] = useState({
        password: false,
        confirmPassword: false
    });

    const toggleVisibility = field => {
        setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const submitFunc = data => {
        setSubmittedEmail(data.email);
        signUp(data);
    };

    if (emailSent) {
        return (
            <div className="flex items-center justify-center px-4 text-light-text">
                <motion.div
                    variants={slideUpVariant}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-2xl shadow-md shadow-color-2 p-10 max-w-sm w-full flex flex-col items-center gap-5 text-center"
                >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-light-primaryCTA/10 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-light-primaryCTA"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-light-text">
                            Check your inbox
                        </h2>
                        <p className="text-sm text-light-text/60 leading-relaxed">
                            We sent a confirmation link to{" "}
                            <span className="text-light-primaryCTA font-semibold">
                                {submittedEmail}
                            </span>
                            . Click it to activate your account.
                        </p>
                    </div>

                    <div className="w-full h-px bg-light-dividers" />

                    <p className="text-sm text-light-text/50">
                        Wrong email?{" "}
                        <Link
                            to="/signup"
                            className="text-light-primaryCTA font-semibold hover:text-light-secondaryAccent transition-colors"
                        >
                            Go back
                        </Link>
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-screen text-light-text overflow-hidden">
            <motion.div
                variants={slideUpVariant}
                initial="hidden"
                animate="visible"
                className="p-8 rounded-2xl bg-white shadow-md shadow-color-2 w-full max-w-sm"
            >
                {/* Header */}
                <div className="mb-6">
                    <h1 className="font-extrabold text-2xl text-light-text">
                        Create your account
                    </h1>
                    <p className="text-sm text-light-text/50 mt-1">
                        Start managing your finances today
                    </p>
                </div>

                <form onSubmit={handleSubmit(submitFunc)}>
                    <div className="flex flex-col gap-3">
                        <Input
                            name="name"
                            label="Name"
                            inputType="text"
                            disabled={isSigningUp}
                            placeholder="Enter your username..."
                            register={register}
                            error={errors}
                            rules={{ required: "Username can't be empty" }}
                        />
                        <Input
                            name="email"
                            label="Email"
                            inputType="email"
                            disabled={isSigningUp}
                            placeholder="Enter your email..."
                            register={register}
                            error={errors}
                            rules={{ required: "Email is required" }}
                        />
                        <Input
                            name="password"
                            label="Password"
                            inputType={
                                visibility.password ? "text" : "password"
                            }
                            disabled={isSigningUp}
                            placeholder="Enter your password..."
                            register={register}
                            error={errors}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters"
                                }
                            }}
                            onHidePassword={() => toggleVisibility("password")}
                            toggle={visibility.password}
                        />
                        <Input
                            name="confirmPassword"
                            label="Confirm Password"
                            inputType={
                                visibility.confirmPassword ? "text" : "password"
                            }
                            disabled={isSigningUp}
                            placeholder="Confirm your password..."
                            register={register}
                            error={errors}
                            rules={{
                                required: "Please confirm your password",
                                validate: value =>
                                    value === watch("password") ||
                                    "Passwords do not match"
                            }}
                            onHidePassword={() =>
                                toggleVisibility("confirmPassword")
                            }
                            toggle={visibility.confirmPassword}
                        />
                    </div>

                    <Button
                        text="Sign up"
                        loader={isSigningUp}
                        className="mt-5 bg-light-primaryCTA hover:bg-light-secondaryAccent text-white font-extrabold rounded-md p-2 uppercase w-full transition-colors"
                        disabled={isSigningUp}
                        type="submit"
                    />
                </form>

                <div className="py-5 flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <div className="h-px flex-1 bg-light-dividers" />
                        <span className="text-sm text-light-text/40">OR</span>
                        <div className="h-px flex-1 bg-light-dividers" />
                    </div>

                    <GoogleBtn />

                    <p className="text-sm text-light-text/60">
                        Already a member?{" "}
                        <Link
                            to="/login"
                            className="text-light-primaryCTA font-bold hover:text-light-secondaryAccent transition-colors"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
