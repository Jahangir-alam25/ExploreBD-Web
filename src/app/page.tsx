import BlogSection from "@/components/layouts/BlogSection";
import FeaturedTours from "@/components/layouts/FeaturedTours";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import Newsletter from "@/components/layouts/Newsletter";
import PopularDestinations from "@/components/layouts/PopularDestinations";
import ReviewsSection from "@/components/layouts/ReviewsSection";
import TravelPartners from "@/components/layouts/TravelPartners";
import WhyChooseUs from "@/components/layouts/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <Navbar />

      <PopularDestinations />
      <FeaturedTours />
      <WhyChooseUs />
      <TravelPartners />
      <BlogSection />
      <ReviewsSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
