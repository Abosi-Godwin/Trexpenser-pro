const CtaSection = () => {
    return (
        <div className="py-10 bg-color-1 grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <button
                    className="bg-color-7 p-3 rounded-md text-color-1
                    font-bold uppercase hover:bg-color-5"
                >
                    Start Saving Free Today
                </button>
            </div>
        </div>
    );
};

export default CtaSection;
