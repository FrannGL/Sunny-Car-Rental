import Layout from "@/src/components/layout/Layout";
import App from "@/src/components/sections/App";
import CarsListing4 from "@/src/components/sections/CarsListing4";
import Hero2 from "@/src/components/sections/Hero2";
import Review2 from "@/src/components/sections/Review2";
import WhyUs1 from "@/src/components/sections/WhyUs1";

export default function Home() {
  return (
    <Layout>
      <Hero2 />
      <CarsListing4 />
      <Review2 />
      <WhyUs1 />
      <App />
    </Layout>
  );
}
