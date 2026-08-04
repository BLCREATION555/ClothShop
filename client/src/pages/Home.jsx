import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrivals from "../components/NewArrivals";
import TrendingProducts from "../components/TrendingProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import InstagramGallery from "../components/InstagramGallery";
import Newsletter from "../components/Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <NewArrivals />
      <TrendingProducts />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}

export default Home;