import { FC } from "react";

// import Image from "next/image";
import ServicesGrid from "./molecules/ServicesGrid";


interface ServicesProps {}

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

const Services: FC<ServicesProps> = ({}) => {
  return (
    <div className="w-frame space-y-20 relative">
      {/* <Image
        alt="dots_"
        src={"/images/dot_cluster.png"}
        width={100}
        height={100}
        className="absolute top-0 right-[5%]"
      /> */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold uppercase text-orange-500">
          Our Service
        </h4>
        <h2 className="  text-[3rem] leading-[3rem] lg:text-[3.9rem] font-bold lg:leading-[6.2rem]">
          WHAT WE OFFER?
        </h2>
      </div>

      <ServicesGrid services={services} />
    </div>
  );
};

export default Services;
