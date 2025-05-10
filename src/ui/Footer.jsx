import { useState } from "react";
import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaEnvelope
} from "react-icons/fa6";

import { motion } from "framer-motion";
import { slideUpVariant } from "../Utils/AnimationVariants";

const currentYear = new Date().getFullYear();
function Footer() {
    const [userEmail, setUserEmail] = useState("");
    const handleEmailSub = e => {
        e.preventDefault();
    };
    return (
        <motion.div
            variants={slideUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-light-navbarFooter py-10 px-5 text-light-text"
        >
            <div className="font-bold">
                <h1 className="text-2xl">
                    Trexpenser: Smart Savings for a Brighter Future.
                </h1>
                <p className="py-2">
                    Manage your expenses, set savings goals, and track your
                    financial progress with ease.
                </p>
            </div>
            <div className="py-5">
                <div>
                    <h1 className="font-bold text-xl mb-3">
                        Join Our Newsletter
                    </h1>
                    <form className="grid grid-col-1 gap-2 md:grid-cols-quarter">
                        <input
                            type="email"
                            required
                            placeholder="Enter your email here..."
                            value={userEmail}
                            onChange={e => setUserEmail(e.target.value)}
                            className="p-3 rounded-md outline-0"
                        />
                        <input
                            type="submit"
                            onClick={e => handleEmailSub(e)}
                            className="bg-light-primaryCTA text-white font-extrabold
                            rounded-md p-2 uppercase "
                        />
                    </form>
                </div>
                <div className="py-5 flex items-start gap-4">
                    <input type="checkbox" />
                    <p className="text-color-3">
                        Also send me motivations, tips and tricks on how to save
                        and manage my budgets.
                    </p>
                </div>
            </div>

            <div
                className="flex flex-col md:flex-row md:justify-between
            md:items-center"
            >
                <div className="py-5">
                    <h1 className="text-2xl text-color-3 font-bold">
                        Quick Links
                    </h1>
                    <ul className="divide-y divide-color-6 py-2 font-bold">
                        <li className="pt-2">Home</li>
                        <li className="pt-2">Savings goal</li>
                        <li className="pt-2">Budget planning</li>
                        <li className="pt-2">FAQ</li>
                        <li className="pt-2">Help center</li>
                        <li className="pt-2">Terms of service</li>
                        <li className="pt-2">Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Follow us</h2>
                    <ul
                        className="flex justify-between
                py-4 gap-4 md:flex-col"
                    >
                        <li
                            className="p-2 bg- text-xl inline rounded
                    text-light-iconColor w-fit"
                        >
                            <FaFacebookF />
                        </li>
                        <li
                            className="p-2 bg-color-4 text-xl inline-block rounded
                     text-light-iconColor w-fit"
                        >
                            <FaXTwitter />
                        </li>
                        <li
                            className="p-2 bg-color-4 text-xl inline-block rounded
                     text-light-iconColor w-fit"
                        >
                            <FaInstagram />
                        </li>
                        <li
                            className="p-2 bg-color-4 text-xl inline-block rounded
                     text-light-iconColor w-fit"
                        >
                            <FaEnvelope />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-center pt-5 text-color-3">
                <p> &copy; {currentYear} Trexpenser. All rights reserved.</p>
            </div>
        </motion.div>
    );
}
export default Footer;
