import { benefits } from "../data/data";
import { CardItem } from "./Card";
import { motion } from "framer-motion";
import { slideUpVariant } from "../Utils/AnimationVariants";

const BenefitsSection = () => {
    return (
        <motion.section
         variants={slideUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-light-sectionBackground flex flex-col gap-4 py-10
        px-5 my-10 text-light-text"
        >
            <div>
                <h1 className="text-2xl font-bold mb-2 text-color-2">
                    Why Choose Trexpenser?
                </h1>
                <p className="text-color-3">
                    Designed to make your financial journey smoother and more
                    efficient.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
                {benefits.map(data => (
                    <CardItem data={data} key={data.id} makeFlex={false} />
                ))}
            </div>
        </motion.section>
    );
};
export default BenefitsSection;
