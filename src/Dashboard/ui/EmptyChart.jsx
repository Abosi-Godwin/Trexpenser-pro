const EmptyChart = ({ src, desc }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <img src={src} className="w-52 h-52 brg-[#e4e7fb] rounded-md" />
            <h1 className="text-sm text-center">{desc}</h1>
        </div>
    );
};

export default EmptyChart;
