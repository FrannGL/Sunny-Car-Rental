import Layout from "@/src/components/layout/Layout";
import App from "@/src/components/sections/App";
import Banners2 from "@/src/components/sections/Banners2";
import Blog1 from "@/src/components/sections/Blog1";
import Brand2 from "@/src/components/sections/Brand2";
import CarsListing2 from "@/src/components/sections/CarsListing2";
import CarsListing5 from "@/src/components/sections/CarsListing5";
import Categories1 from "@/src/components/sections/Categories1";
import Cta6 from "@/src/components/sections/Cta6";
import Cta7 from "@/src/components/sections/Cta7";
import Hero1 from "@/src/components/sections/Hero1";
import Review2 from "@/src/components/sections/Review2";
import Search1 from "@/src/components/sections/Search1";
import Services1 from "@/src/components/sections/Services1";
import Static1 from "@/src/components/sections/Static1";
import Team1 from "@/src/components/sections/Team1";
import Testimonials from "@/src/components/sections/Testimonials";
import WhyUs1 from "@/src/components/sections/WhyUs1";
export default function Index3() {
  return (
    <>
      <Layout footerStyle={1}>
        <Hero1 />
        <Search1 />
        <CarsListing2 />
        <Brand2 noBg />
        <WhyUs1 cls="background-100 pt-96" />
        <Banners2 />
        <Cta6 />
        <Static1 />
        <Categories1 />
        <Cta7 />
        <CarsListing5 />
        <Testimonials />
        <Services1 />
        <Review2 />
        <Team1 />
        <Blog1 />
        <App />
      </Layout>
    </>
  );
}
