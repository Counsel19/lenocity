import ServicesGrid from "@/components/home/molecules/ServicesGrid";
import RegisterNow from "@/components/home/RegisterNow";
import Services from "@/components/home/Services";
import PageTitle from "@/components/shared/PageTitle";
import { FC } from "react";

const services = [
  {
    _id: "1",
    name: "Web Devlopment",
    description: "Learn how to create your own websites from scratch",
    image: "/images/icon_brand.png",
    link: "/",
  },
  {
    _id: "2",
    name: "Graphic Design",
    description: "Unleash your creativity with our Graphic Design course!",
    image: "/images/icon_brand.png",
    link: "/",
  },
  {
    _id: "3",
    name: "Computer Appreciation ",
    description:
      "Get comfortable with computers in our Computer Appreciation course!",
    image: "/images/icon_brand.png",
    link: "/",
  },
];

interface pageProps {}
const page: FC<pageProps> = ({}) => {
  return (
    <div className="space-y-[8rem]">
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
