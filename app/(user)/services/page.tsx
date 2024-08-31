import ServicesGrid from "@/components/home/molecules/ServicesGrid";
import RegisterNow from "@/components/home/RegisterNow";
import Services, { services } from "@/components/home/Services";
import PageTitle from "@/components/shared/PageTitle";
import { FC } from "react";


interface pageProps {}
const page: FC<pageProps> = ({}) => {
  return (
    <div className="grid gap-20">
      <div className="hidden  bg-[url('/images/bg-deco.svg')] bg-cover bg-center absolute top-0 right-0 w-[60%] h-[200px] md:flex z-0" />
      <PageTitle title="Services" />
      <div className="space-y-28 w-frame">
        <div className="lg:w-[60%] mx-auto space-y-8">
          <h3 className=" text-[2.4rem] lg:text-[4.8rem] text-center text-primary lg:leading-[6rem]">
            Empowering Young Minds with Essential Tech Skills
          </h3>
          <p className="text-[#667085] text-center text-[1.6rem] lg:text-2xl leading-[3rem]">
            Explore our services and find the perfect fit for your child&apos;s
            learning journey.
          </p>
        </div>

        <ServicesGrid services={services} />

        <RegisterNow />
      </div>
    </div>
  );
};

export default page;
