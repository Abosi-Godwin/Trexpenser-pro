import { useState } from "react";
import { faqs } from "../data/data.js";
const FaqSection = () => {
    return (
        <div className="py-10 px-5 bg-color-8 grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-color-2 font-semibold">
                    Got Questions? We’ve Got Answers!
                </h1>
                <p className="text-color-3">
                    Find quick answers to help you get started with Trexpenser.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 py-5">
                {faqs.map((data,index) => (
                    <Faq faqData={data} key={index}/>
                ))}
            </div>
        </div>
    );
};

const Faq = ({ faqData }) => {
    const [openAns, setOpenAns] = useState(false);

    const handleToggle = () => {
        setOpenAns(prev => !prev);
    };

    return (
        <div className="grid grid-cols-1 rounded-md">
            <div
                className={`flex gap-3 bg-color-7 justify-between
                        items-center
                          p-4 rounded-t-md ${!openAns && "rounded-b-md"}`}
            >
                <h1 className="font-bold text-color-3">{faqData.question}</h1>
                <div
                    className="p-2 bg-color-8 text-color-3
                            rounded-full text-2xl font-bold w-8 h-8 flex
                            items-center justify-center"
                    onClick={handleToggle}
                >
                    <h1>{openAns ? "-" : "+"}</h1>
                </div>
            </div>

            <div
                className={`bg-color-3 rounded-b-md text-color-10
                transition-all ease-in-out duration-300
                 ${!openAns ? "overflow-hidden h-0" : "p-4 h-auto"}`}
            >
                <p>{faqData.answer}</p>
            </div>
        </div>
    );
};

export default FaqSection;
