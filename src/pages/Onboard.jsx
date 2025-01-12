import Header from "../components/Header.jsx";
import FeaturesSection from "../components/Features.jsx";
import BenefitsSection from "../components/Benefits.jsx";
import ReviewsSection from "../components/Reviews.jsx";
import FaqSection from "../components/Faqs.jsx";
import CtaSection from "../components/CtaSection.jsx";
import FooterCta from "../components/FooterCta.jsx";
import Footer from "../components/Footer.jsx";

const OnboardPage = () => {
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
export default OnboardPage;
