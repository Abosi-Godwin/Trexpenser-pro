const Loader = () => {
    return (
        <div
            className="h-screen w-screen bg-light-sectionBackground dark:bg-dark-cardBackground dark:text-dark-text fixed
        text-2xl font-bold m-[0_auto] z-40 flex flex items-center justify-center
        text-light-text left-0 top-0 md:min-w-screen"
        >
            <div className="spinner"></div>
        </div>
    );
};
export default Loader;
