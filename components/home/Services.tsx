import { FC } from "react";

// import Image from "next/image";
import ServicesGrid from "./molecules/ServicesGrid";


interface ServicesProps {}


export const services = [
  {
    _id: "0",
    name: "Coding for youngsters (8-12years)",
    description: "Basic coding concept and syntax, development of interpersonal skills(good communication, logical reasoning, collaboration, creative thinking, team-work, numericals and time management), game and challenge building",
    image: "/images/coding.jpg",
    link: "/",
  },
  {
    _id: "1",
    name: "Web Design",
    description: " Focus on HTML, CSS, BOOTSTRAP, hosting and Version control",
    image: "/images/web-pc.jpg",
    link: "/",
  },
  {
    _id: "2",
    name: "Graphic Design",
    description: "Focus on use of Canva, AI tools and Adobe for creative designs.",
    image: "/images/design.jpg",
    link: "/",
  },
  {
    _id: "3",
    name: "Computer Appreciation ",
    description:
      "Get comfortable with computers in our Computer Appreciation course!",
    image: "/images/computer-appreciation.png",
    link: "/",
  },
  {
    _id: "4",
    name: "Engineering ",
    description:
      "Fun Engineering activities to  create curiosity and engaged  learning of the basics of Engineering",
    image: "/images/engineer.jpg",
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
