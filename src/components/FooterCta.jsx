import {
    FaCheck,
    FaShieldHalved,
    FaScaleBalanced,
    FaGlobe,
    FaQuoteLeft,
    FaQuoteRight
} from "react-icons/fa6";
import { Link } from "react-router";
const FooterCta = () => {
    return (
        <div className="py-10 px-5 bg-color-1">
            <div className="text-center w-full pt-5">
                <h1 className="text-2xl font-bold pb-3">
                    Your Financial Freedom Starts Today!
                </h1>
                <p className="text-sm">
                    Join <strong>50,000+</strong> users transforming their
                    savings with Trexpenser.
                </p>
            </div>

            <div className="flex flex-col p-3 gap-5 md:flex-row">
                <div className="py-10 px-5">
                    <img
                        src="./savings_done.svg"
                        alt="Savings achieved"
                        className="p-4"
                    />
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <ul className="font-semibold flex flex-col gap-2 mb-5">
                        <li className="flex items-center  gap-2">
                            {" "}
                            <FaCheck
                                className="p-1 text-4xl w-6 h-6
                            rounded-full bg-color-8 text-color-1"
                            />
                            Automate your savings effortlessly.
                        </li>
                        <li className="flex items-center gap-2">
                            {" "}
                            <FaCheck
                                className="p-1 text-4xl w-6 h-6
                            rounded-full bg-color-8 text-color-1"
                            />
                            Track expenses with ease.
                        </li>
                        <li className="flex items-center gap-2">
                            {" "}
                            <FaCheck
                                className="p-1 text-4xl w-6 h-6
                            rounded-full bg-color-8 text-color-1"
                            />
                            Achieve financial goals faster.
                        </li>
                        <li className="flex items-center gap-2">
                            {" "}
                            <FaCheck
                                className="p-1 text-4xl w-6 h-6
                            rounded-full bg-color-8 text-color-1"
                            />
                            Secure & private – your data is safe.
                        </li>
                    </ul>
                    <p>
                        Trexpenser empowers you to take control of your finances
                        with smart tools designed for success. Save smarter, not
                        harder.”
                    </p>
                </div>
                <div
                    className="flex flex-col items-center justify-center gap-4
                py-5"
                >
                    <Link
                        to="/login"
                        className="bg-color-7 p-3 rounded-md text-color-1
                    font-bold hover:bg-color-5 w-9/10 text-center"
                    >
                        Get Started for Free
                    </Link>
                    <button
                        className="font-sm font-bold text-center text-color-10
                        uppercase underline"
                    >
                        Start Free Trial
                    </button>
                    <p className="text-sm text-center">
                        Hurry! Last week alone, <strong>2,000 </strong>new users
                        joined Trexpenser!”.
                    </p>
                </div>
            </div>

            <div className="px-5 py-10 bg-color-3 rounded-md">
                <div>
                    {" "}
                    <p
                        className="text-center font-extrabold text-color-11
                    text-xl"
                    >
                        80% of users achieve their savings goals in 3 months!
                    </p>
                </div>
                <div className="grid grid-cols-1 py-10">
                    <div className="flex gap-3 items-center">
                        <FaCheck className="text-color-8" />{" "}
                        <h1>Secured Payment</h1>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FaShieldHalved className="text-color-8" />{" "}
                        <h1>SSL certified</h1>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FaScaleBalanced className="text-color-8" />
                        <h1>GDPR compliant</h1>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FaGlobe className="text-color-8" />
                        <h1>trusted by 50k users</h1>
                    </div>
                </div>

                <div
                    className="grid grid-cols-mine gap-0 bg-color-2 py-4
                rounded-md"
                >
                    <div className="flex justify-end">
                        <FaQuoteLeft />
                    </div>
                    <div>
                        <p className="italic text-center">
                            Trexpenser is a game-changer for anyone serious
                            about saving!”
                        </p>
                    </div>
                    <div
                        className="flex justify-start
                    items-end"
                    >
                        <FaQuoteRight />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FooterCta;
