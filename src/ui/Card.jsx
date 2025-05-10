export const CardItem = ({ data, makeFlex = true }) => {
    const Icon = data.icon;
    return (
        <div
            className={`bg-light-cardBackground p-3 rounded-md ${
                makeFlex ? "flex gap-6" : "block gap-3"
            }
        justify-center`}
        >
            <div
                className="w-14 h-14 rounded-full flex items-center
            justify-center text-2xl text-light-iconColor"
            >
                <Icon />
            </div>

            <div className="flex flex-col gap-2 text-light-text">
                <p className="font-bold">
                    <strong>{data.title}</strong>
                </p>
                <p className="text-coloxr-1"> {data.description}</p>
            </div>
        </div>
    );
};
 