import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slideUpVariant } from "../Utils/AnimationVariants";

const CtaSection = () => {
    return (
        <motion.div  variants={slideUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} className="py-10 bg-color-1 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="py-5 px-16">
                <img
                    src="/saving_img1.svg"
                    alt="Start saving with us"
                    className="w-full h-auto p-4"
                />
            </div>
            <div className="flex flex-col items-center justify-center p-5 gap-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-center ">
                        Simplify Your Savings Journey Today.
                    </h1>
                    <p className="text-center pt-2">
                        Trexpenser empowers you to track expenses, manage
                        savings, and achieve financial freedom with ease. Our
                        intuitive platform provides personalized insights and
                        automated tools, ensuring your money works for you. Join
                        a community of smart savers and start building your
                        brighter financial future today.
                    </p>
                </div>
                <Link
                    to="/signup"
                    className="bg-light-primaryCTA p-3 rounded-md text-white
                    font-bold uppercase hover:bg-light-secondaryAccent"
                >
                    Start Saving Free Now
                </Link>
            </div>
        </motion.div>
    );
};

export default CtaSection;
