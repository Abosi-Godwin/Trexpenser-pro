import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaEnvelope
} from "react-icons/fa6";
import { useState } from "react";
const currentYear = new Date().getFullYear();
function Footer() {
    const [userEmail, setUserEmail] = useState("");
    const handleEmailSub = e => {
        e.preventDefault();
    };
    return (
        <div className="bg-color-9 py-10 px-5">
            <div className="text-color-2 font-bold">
                <h1 className="text-color-3 text-2xl">
                    Trexpenser: Smart Savings for a Brighter Future.
                </h1>
                <p className="text-color-5 py-2">
                    Manage your expenses, set savings goals, and track your
                    financial progress with ease.
                </p>
            </div>
            <div className="py-5">
                <div>
                    <h1 className="font-bold text-xl text-color-2 mb-3">
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
                            className="bg-color-8 text-color-2 font-extrabold
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
            <div className="py-5">
                <h1 className="text-2xl text-color-3 font-bold">Quick Links</h1>
                <ul
                    className="divide-y divide-color-6 py-2 text-color-4
                font-bold"
                >
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
                <h2 className="text-2xl text-color-3 font-bold">Follow us</h2>
                <ul
                    className="text-color-white flex justify-between
                py-4 gap-4"
                >
                    <li
                        className="p-2 bg-color-4 text-xl inline rounded
                    text-color-8 w-fit"
                    >
                        <FaFacebookF />
                    </li>
                    <li
                        className="p-2 bg-color-4 text-xl inline-block rounded
                    text-color-8 w-fit"
                    >
                        <FaXTwitter />
                    </li>
                    <li
                        className="p-2 bg-color-4 text-xl inline-block rounded
                    text-color-8 w-fit"
                    >
                        <FaInstagram />
                    </li>
                    <li
                        className="p-2 bg-color-4 text-xl inline-block rounded
                    text-color-8 w-fit"
                    >
                        <FaEnvelope />
                    </li>
                </ul>
            </div>
            <div className="flex items-center justify-center pt-5 text-color-3">
                <p> &copy; {currentYear} Trexpenser. All rights reserved.</p>
            </div>
        </div>
    );
}
export default Footer;
