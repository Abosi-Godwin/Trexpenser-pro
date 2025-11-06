import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { FaChevronLeft } from "react-icons/fa6";

import { Logo } from "../../ui/Logo";
import Input from "../Form/Input";
import Button from "../Form/Button";
import Form from "../Form/Form";

import { slideUpVariant } from "../../Utils/AnimationVariants";
import { useSendForgotPassword } from "../../hooks/useSendForgotPassword";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { error, sendEmail, sendingEmail } = useSendForgotPassword();

    const handleFormSubmit = datas => {
        const { email } = datas;

        sendEmail(email, {
            onSuccess: () => setEmailSent(true)
        });
    };
    return (
        <div
            className="p-10 bg-light-sectionBackground h-dvh flex flex-1
        items-center justify-center"
        >
            <motion.div
                variants={slideUpVariant}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="bg-light-background rounded-md p-4 flex flex-col
                gap-4 md:w-5/12 py-6"
            >
                <Logo />
                <div>
                    <h1 className="text-xl font-bold">Forgot your password?</h1>
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
                            label="email"
                            inputType="email"
                            placeholder="Enter your email..."
                            className="p-3 rounded-md outline-0 border"
                            disable={false}
                            register={register}
                            error={errors}
                            rules={{
                                required: "Enter your email for verification."
                            }}
                        />
                        <Button
                            text="send reset email"
                            className="bg-light-primaryCTA text-white flex mt-2
                            items-center justify-center
                                font-extrabold rounded-md p-2 uppercase w-full
                                hover:bg-light-secondaryAccent"
                            loader={sendingEmail}
                            disable={sendingEmail}
                            onButtonClick={handleSubmit}
                        />
                    </Form>
                ) : (
                    <EmailResetResponse error={error} />
                )}
                <Link to="/login">
                    <Button
                        text={
                            <span
                                className="w-full flex items-center
                            justify-center gap-3"
                            >
                                <FaChevronLeft /> Back to login
                            </span>
                        }
                        className="bg-light-sectionBackground text-whitte flex
                            items-center justify-center
                                font-extrabold rounded-md p-2 uppercase w-full
                                hover:bg-light-secondaryAccent"
                        disable={sendingEmail}
                        onButtonClick={()=>{}}
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
                <p>{error?.message}</p>
            ) : (
                <p>
                    Password reset email sent! <br /> Check your inbox.
                </p>
            )}
        </div>
    );
};
