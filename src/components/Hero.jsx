import { Link } from "react-router";

const HeroSection = () => {
    return (
        <div
            className="py-16 px-4 flex flex-col justify-center gap-12
        items-center md:flex-row-reverse"
        >
            <div
                className="flex flex-col gap-10 items-center justify-center
           "
            >
                <div className="flex flex-col gap-2 items-center justify-center
                md:w-1/2">
                    <h1 className="text-2xl font-bold text-color-8 text-center uppercase">
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
                        to="/login"
                        className="font-semibold p-4 bg-color-8 text-white
            rounded-md text-center font-bold block w-4/5"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/subscribe"
                        className="font-sm font-bold text-center text-color-10
                        uppercase underline"
                    >
                        Start free trial
                    </Link>
                </div>
            </div>

            <div className="p-2 md:w-1/2">
                <img src="/saving_img2.svg" className="w-52 h-auto w-full" />
            </div>
        </div>
    );
};
export default HeroSection;
