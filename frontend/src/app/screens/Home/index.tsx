import CategorySection from "./categorySection";
import Header from "./header";
import PopularBikes from "./popular";
import PromoBanner from "./promotion";
import ServicesSection from "./services";

export default function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <CategorySection />
      <PopularBikes />
      <ServicesSection />
      <PromoBanner />
    </div>
  );
}
