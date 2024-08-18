import { SquareTerminal } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface WhyChooseUsProps {}
const WhyChooseUs: FC<WhyChooseUsProps> = ({}) => {
  return (
    <div className="w-frame">
      <div className="space-y-20">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold uppercase text-orange-500">
            Why Choose Us
          </h4>
          <h2 className="  text-[3rem] leading-[4rem] lg:text-[3.9rem] font-bold lg:leading-[6.2rem]">
            BENEFITS FOR TRAINING WITH US
          </h2>
        </div>
        <div className="grid gap-[5rem] lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-10">
            <div className="flex gap-6 items-center">
              <div className="bg-violet-200 text-violet-500 p-6 rounded-xl">
                <SquareTerminal />
              </div>
              <div className="space-y-3">
                <h5 className="font-semibold text-[1.6rem]  text-slate-800">
                  Hands-On Learning Experience
                </h5>
                <p className="text-slate-500 text-base leading-8 lg:w-[70%]">
                  Kids and teens gain practical, hands-on experience with the
                  latest technology,
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="bg-emerald-200 text-emerald-500 p-6 rounded-xl">
                <SquareTerminal />
              </div>
              <div className="space-y-3">
                <h5 className="font-semibold text-[1.6rem] text-slate-800">
                  Hands-On Learning Experience
                </h5>
                <p className="text-slate-500 text-base leading-8 lg:w-[70%]">
                  Kids and teens gain practical, hands-on experience with the
                  latest technology,
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="bg-pink-200 text-pink-500 p-6 rounded-xl">
                <SquareTerminal />
              </div>
              <div className="space-y-3">
                <h5 className="font-semibold text-[1.6rem] text-slate-800">
                  Hands-On Learning Experience
                </h5>
                <p className="text-slate-500 text-base leading-8 lg:w-[70%]">
                  Kids and teens gain practical, hands-on experience with the
                  latest technology,
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* <Image
              alt="gradient"
              width={300}
              height={300}
              src={"/images/gradient.png"}
              className="absolute right-[5%] -top-[20rem]"
            /> */}
            <div className=" rounded-[2rem] w-[90%] overflow-hidden relative">
              <div />
              <Image
                width={500}
                height={600}
                src={"/images/little-girl-studying.jpg"}
                alt="Little Girls Studying"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
