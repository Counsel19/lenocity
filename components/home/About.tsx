import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "../ui/button";

interface AboutProps {}
const About: FC<AboutProps> = ({}) => {
  return (
    <div className="relative bg-[url('/images/little-boy-laptop.jpg')]  lg:h-[450px] bg-fixed bg-right bg-cover py-20 ">
      <div className="bg-orange-900 absolute top-0 left-0 right-0 bottom-0 bg-opacity-70" />

      <div className="lg:w-[70%] relative  m-auto text-center text-white grid place-content-center space-y-10">
        <h4 className="text-lg font-semibold uppercase text-slate-200">
          About Us
        </h4>
        <h2 className=" text-[3rem] leading-[3rem] lg:text-[3.9rem] font-bold lg:leading-[6.2rem]">
          WHAT IS LENOCITY?
        </h2>
        <p className="text-[1.5rem] leading-[3rem] font-medium">
          Lenocity is a learning platform that provides simplified training in
          technology, Engineering ,Arts and Design for young people. Lenocity is
          simply a learning city where information is simplified and learning is
          fun. We use practical storytelling to teach and break down complex
          topics that anyone can understand regardless of level of experience.
          Our focus is on young people that want to explore and harness their
          skills, while identifying their career interest. We hold them by the
          hand in learning, allowing them to freely navigate and grow.
        </p>

        <Link
          href={"/contact"}
          className={cn(
            buttonVariants({
              className: "w-[150px] bg-white text-orange-500  mx-auto rounded-[3rem] hover:text-white",
            })
          )}
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
};

export default About;
