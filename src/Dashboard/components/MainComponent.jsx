import ScrollToTop from "./ScrollToTop";


const MainSection = ({ children }) => {
    return (
        <section
            className="col-start-2 bg-light-mainBackground
        text-light-text dark:bg-dark-mainBackground dark:text-dark-text p-4
        pt-20"
        >
            <ScrollToTop />
            {children}
            
        </section>
    );
};
export default MainSection;
