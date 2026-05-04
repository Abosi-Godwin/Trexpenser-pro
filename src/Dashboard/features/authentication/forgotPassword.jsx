import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronLeft } from "react-icons/fa6";

import { Logo } from "../../ui/Logo";
import Input from "../Form/Input";
import Button from "../Form/Button";
import Form from "../Form/Form";
import { slideUpVariant } from "../../utils/AnimationVariants";
import { useSendForgotPassword } from "../../hooks/useSendForgotPassword";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { error, sendEmail, sendingEmail } = useSendForgotPassword();

    const handleFormSubmit = ({ email }) => {
        sendEmail(email, {
            onSuccess: () => setEmailSent(true)
        });
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
                    <h2 className="text-xl font-bold">Forgot your password?</h2>
                    <p className="text-sm mb-2">
                        Enter your registered email below.
                    </p>
                    <hr />
                </div>

                {!emailSent ? (
                    <Form
                        handleSubmitFun={handleSubmit}
                        submitFun={handleFormSubmit}
                    >
                        <Input
                            name="email"
                            label="email"
                            inputType="email"
                            placeholder="Enter your email..."
                            disabled={sendingEmail}
                            register={register}
                            error={errors}
                            rules={{
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address."
                                }
                            }}
                        />
                        <Button
                            text={
                                sendingEmail ? "Sending..." : "Send reset email"
                            }
                            type="submit"
                            disabled={sendingEmail}
                            loader={sendingEmail}
                            className="bg-light-primaryCTA text-white flex mt-2
                items-center justify-center font-extrabold rounded-md 
                p-2 uppercase w-full hover:bg-light-secondaryAccent
                disabled:opacity-60"
                        />
                    </Form>
                ) : (
                    <EmailResetResponse error={error} />
                )}

                <Link to="/login">
                    <Button
                        text={
                            <span className="w-full flex items-center justify-center gap-3">
                                <FaChevronLeft /> Back to login
                            </span>
                        }
                        disabled={sendingEmail}
                        className="bg-light-sectionBackground flex items-center 
              justify-center font-extrabold rounded-md p-2 uppercase 
              w-full hover:bg-light-secondaryAccent"
                    />
                </Link>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;

export const EmailResetResponse = ({ error }) => {
    return (
        <div className="text-center py-5 font-semibold">
            {error ? (
                <p className="text-red-500">{error?.message}</p>
            ) : (
                <p className="text-green-600">
                    Password reset email sent! <br /> Check your inbox.
                </p>
            )}
        </div>
    );
};
