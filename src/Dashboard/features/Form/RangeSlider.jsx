import { motion } from "framer-motion";
import { dropdownVariants } from "../../Utils/AnimationVariants";

const RangeSlider = ({ show, register, watch }) => {
    const percent = watch("percentage") || 0;
    return (
        <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            exit="hidden"
            className="w-full
  bg-light-sectionBackground p-2 rounded-md"
        >
            <div className="grid grid-cols-[1fr_2fr] items-center">
                <label htmlFor="savingPercent">Percentage:</label>
                <input
                    id="savingPercent"
                    type="range"
                    min="1"
                    max="50"
                    className="cursor-pointer"
                    {...register("percentage")}
                />
            </div>
            <p className="text-sm italic">{`${percent}% of your income will be
             saved automatically`}</p>
        </motion.div>
    );
};
export default RangeSlider;
