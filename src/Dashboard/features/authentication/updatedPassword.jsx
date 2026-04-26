import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { Logo } from "../../ui/Logo";
import Input from "../Form/Input";
import Button from "../Form/Button";
import Form from "../Form/Form";

import { slideUpVariant } from "../../Utils/AnimationVariants";
import { useSendForgotPassword } from "../../hooks/useSendForgotPassword";

const UpdatePassword = () => {
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { error, sendEmail, sendingEmail } = useSendForgotPassword();

    console.log(error);

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
                    <h1 className="text-xl font-bold">Update your password.</h1>
                    <p className="text-sm mb-2">
                        Enter your registered email below.
                    </p>
                    <hr />
                </div>

                <Form
                    handleSubmitFun={handleSubmit}
                    submitFun={handleFormSubmit}
                >
                    <Input
                        label="New password"
                        inputType="password"
                        placeholder="Enter your new password..."
                        className="p-3 rounded-md outline-0 border"
                        disable={false}
                        register={register}
                        error={errors}
                        rules={{
                            required: "Enter a new password."
                        }}
                    />
                    <Input
                        label="Confirm password"
                        inputType="password"
                        placeholder="Confirm your new password..."
                        className="p-3 rounded-md outline-0 border"
                        disable={false}
                        register={register}
                        error={errors}
                        rules={{
                            required: "Enter a new password."
                        }}
                    />
                    <Button
                        text="Update password"
                        className="bg-light-primaryCTA text-white flex mt-2
                            items-center justify-center
                                font-extrabold rounded-md p-2 uppercase w-full
                                hover:bg-light-secondaryAccent"
                        loader={sendingEmail}
                        disable={sendingEmail}
                        onButtonClick={handleSubmit}
                    />
                </Form>
            </motion.div>
        </div>
    );
};

export default UpdatePassword;
