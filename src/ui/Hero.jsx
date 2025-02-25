import { Link } from "react-router";
import { useTheme } from "../contexts/ThemeContext.jsx";
const HeroSection = () => {
    const { lightTheme } = useTheme();
    return (
        <div
            className="py-16 px-4 flex flex-col justify-center gap-12
        items-center pt-28 md:pt-32 md:flex-row-reverse md:py-28"
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
                <div
                    className="w-full flex flex-col items-center justify-center
                gap-2"
                >
                    <Link
                        to="/signup"
                        className={`font-semibold p-4 
            rounded-md text-center font-bold block w-4/5 ${
                lightTheme
                    ? "bg-color-8 text-white"
                    : "bg-white text-color-8 font-extrabold"
            }`}
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/subscribe"
                        className={`font-sm font-bold text-center
                        uppercase underline ${
                            lightTheme ? "text-color-9" : "text-color-4"
                        } `}
                    >
                        Start free trial
                    </Link>
                </div>
            </div>

            <div className="p-2 md:w-1/2">
                <img src="/saving_img2.svg" className="w-52 h-auto w-full"
                alt="Why you need Trexpenser"/>
            </div>
        </div>
    );
};
export default HeroSection;
