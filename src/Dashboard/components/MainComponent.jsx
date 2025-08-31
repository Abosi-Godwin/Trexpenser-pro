const MainSection = ({ children }) => {
    return (
        <section
            className="pt-20 md:pt-5 col-start-2 min-h-screen p-3
         bg-light-mainBackground dark:bg-dark-mainBackground"
        >
            {children}
        </section>
    );
};
export default MainSection;
