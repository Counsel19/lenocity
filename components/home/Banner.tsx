import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "../ui/button";

interface BannerProps {}
const Banner: FC<BannerProps> = ({}) => {
  return (
    <div className="grid relative lg:grid-cols-[1.5fr_1fr] gap-10 justify-between  w-frame ">
      <div className="flex flex-col gap-12">
        <h4 className="text-lg font-semibold uppercase text-orange-500">
          Interactive Courses, Real-World Skills
        </h4>
        <h2 className="lg:w-[80%] text-[3.5rem] lg:text-[5.9rem] font-bold leading-[4rem] lg:leading-[6.2rem]">
          Where Kids{" "}
          <span className="font-semibold text-orange-500">
            {" "}
            &lt;Code&nbsp;/&gt;
          </span>{" "}
          Their Own Success
        </h2>
        <p className="text-[1.5rem] leading-[3rem] w-[80%] text-slate-700 font-medium">
          Our programs are designed to inspire creativity, foster innovation,
          and prepare young minds for a future in a tech-driven world.
        </p>

        <Link href={"/contact"} className={cn(buttonVariants(
          {
            className: "w-[150px] rounded-[3rem]"
          }
        ))}>
          Get In Touch
        </Link>
      </div>

      <div>
        <div className=" lg:h-[400px] lg:w-[400px] rounded-2xl overflow-hidden ">
          <Image
            width={400}
            height={500}
            src={"/images/boy-laptop.jpg"}
            alt="Boy with Laptop"
            className="h-full w-full object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
