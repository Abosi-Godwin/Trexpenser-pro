import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { slideUpVariant } from "../Services/NavAnimationVariant";
const HeroSection = () => {
    return (
        <motion.div
            variants={slideUpVariant}
            initial="hidden"
            animate="visible"
            className="py-16 px-4 flex flex-col justify-center gap-12
        items-center pt-28 md:pt-32 md:flex-row-reverse md:py-28
        text-light-text"
        >
            <div
                className="flex flex-col gap-10 items-center justify-center
           "
            >
                <div
                    className="flex flex-col gap-2 items-center justify-center
                    md:gap-4
                md:w-1/2"
                >
                    <h1 className="text-2xl font-bold text-center uppercase">
                        Simplify your financial journey with Trexpenser
                    </h1>
                    <p className="text-center">
                        Track expenses, set savings goals, and stay on top of
                        your budget with ease.
                    </p>
                </div>

                <motion.div
                    className="w-full flex flex-col items-center justify-center
                gap-2"
                >
                    <Link
                        to="/signup"
                        className="font-semibold text-2xl p-4 
            rounded-md text-center font-bold block w-4/5 flex justify-center
            relative bg-light-primaryCTA hover:bg-light-secondaryAccent dark:text-white"
                    >
                        Get Started
                        <span className="absolute flex size-4 right-2 top-2">
                            <span
                                className="absolute inline-flex h-full w-full
                            animate-ping rounded-full bg-white opacity-75"
                            ></span>
                            <span
                                className="relative inline-flex size-4
                            rounded-full bg-white"
                            ></span>
                        </span>
                    </Link>

                    <Link
                        to="/subscribe"
                        className="font-sm font-bold text-center
                        uppercase underline 
                        "
                    >
                        Start free trial
                    </Link>
                </motion.div>
            </div>

            <div className="p-2 md:w-1/2">
                <img
                    src="/saving_img2.svg"
                    className="w-52 h-auto w-full"
                    alt="Why you need Trexpenser"
                />
            </div>
        </motion.div>
    );
};
export default HeroSection;
