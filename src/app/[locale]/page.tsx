import Layout from "@/src/components/layout/Layout";
import App from "@/src/components/sections/App";
import Blog2 from "@/src/components/sections/Blog2";
import Brand2 from "@/src/components/sections/Brand2";
import CarsListing3 from "@/src/components/sections/CarsListing3";
import CarsListing4 from "@/src/components/sections/CarsListing4";
import Categories2 from "@/src/components/sections/Categories2";
import Cta4 from "@/src/components/sections/Cta4";
import Cta5 from "@/src/components/sections/Cta5";
import Hero2 from "@/src/components/sections/Hero2";
import Review2 from "@/src/components/sections/Review2";
import Static1 from "@/src/components/sections/Static1";
import Team1 from "@/src/components/sections/Team1";
import Testimonials from "@/src/components/sections/Testimonials";
import WhyUs1 from "@/src/components/sections/WhyUs1";

export default function Home() {
  return (
    <>
      <Layout>
        <Hero2 />
        {/* <Categories2 /> */}
        <CarsListing3 />
        <Cta4 />
        <Review2 />
        <Static1 />
        <CarsListing4 />
        <Brand2 />
        {/* <Team1 /> */}
        <Cta5 />
        {/* <Testimonials /> */}
        <WhyUs1 />
        {/* <Blog2 /> */}
        <App />
      </Layout>
    </>
  );
}
