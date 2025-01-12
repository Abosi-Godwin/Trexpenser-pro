import { benefits } from "../data/data.js";

const BenefitsSection = () => {
    return (
        <section className="bg-color-8 flex flex-col gap-4 py-10 px-5">
            <div>
                <h1 className="text-2xl font-bold mb-2 text-color-2">
                    Why Choose Trexpenser?
                </h1>
                <p className="text-color-3">
                    Designed to make your financial journey smoother and more
                    efficient.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 py-5">
                {benefits.map((data, index) => {
                    const Icon = data?.icon;
                    return (
                        <div
                            key={data.id}
                            className="bg-color-7 p-3 rounded-md"
                        >
                            <div>
                                <div  className="w-14 h-14 rounded-full
                                bg-color-1 flex items-center justify-center
                                text-2xl text-color-8">
                                    <Icon />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 py-3">
                                <p className="text-color-3 font-bold">
                                    <strong>{data.title}</strong>
                                </p>
                                <p className="text-color-4">
                                    {" "}
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
export default BenefitsSection;
