import { features } from "../data/data.js";
const FeaturesSection = () => {
    return (
        <section className="bg-color-1 flex flex-col gap-4 py-10 px-5">
            <div>
                <h1 className="text-2xl font-bold mb-2">
                    What Makes Trexpenser Unique?
                </h1>
                <p>
                    Explore how Trexpenser helps you achieve financial freedom
                    with these powerful features.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
                {features.map((data, index) => {
                    const Icon = data.icon;
                    return (
                        <div
                            key={data.id}
                            className="bg-color-2 p-3 rounded-md flex gap-3
                        justify-center"
                        >
                            <div>
                                <div
                                    className="w-14 h-14 rounded-full
                                bg-color-1 flex items-center justify-center
                                text-2xl text-color-8"
                                >
                                    <Icon />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className=" font-bold">
                                    <strong>{data.title}</strong>
                                </p>
                                <p className="text-coloxr-1">
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
export default FeaturesSection;
