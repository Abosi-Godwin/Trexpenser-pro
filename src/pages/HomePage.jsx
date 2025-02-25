import Header from "../ui/Header.jsx";
import FeaturesSection from "../ui/Features.jsx";
import BenefitsSection from "../ui/Benefits.jsx";
import ReviewsSection from "../ui/Reviews.jsx";
import FaqSection from "../ui/Faqs.jsx";
import CtaSection from "../ui/CtaSection.jsx";
import FooterCta from "../ui/FooterCta.jsx";
import Footer from "../ui/Footer.jsx";



const HomePage = () => {
   
    return (
        <>
            <Header />
            <main>
                <FeaturesSection />
                <BenefitsSection />
                <CtaSection />
                <ReviewsSection />
                <FaqSection />
                <FooterCta />
            </main>
            <Footer />
        </>
    );
};
export default HomePage;
