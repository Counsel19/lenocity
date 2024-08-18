import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import BlogSection from "@/components/home/BlogSection";
import RegisterNow from "@/components/home/RegisterNow";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="grid gap-[8rem] mt-[3rem]">
      <div className=" hidden  bg-[url('/images/bg-deco.svg')] bg-cover bg-center absolute top-0 right-0 w-[60%] h-screen md:flex z-0" />
      <Banner />
      <About />
      <Services />
      <WhyChooseUs />
      <RegisterNow />
      <BlogSection />
    </div>
  );
}
