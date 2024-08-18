import { FC } from "react";
import { Button } from "../ui/button";

interface RegisterNowProps {}
const RegisterNow: FC<RegisterNowProps> = ({}) => {
  return (
    <div className=" w-frame bg-[url('/images/Rectangle.png')] bg-no-repeat lg:h-[300px] grid place-content-center p-8 ">
      <div className="space-y-6 grid place-content-center text-center w-[80%] lg:w-[60%] mx-auto">
        <h4 className="text-lg font-semibold uppercase text-orange-500">
          Ready to Unlock Your Child’s Potential?
        </h4>
        <p className=" text-2xl lg:text-3xl leading-[3rem] lg:leading-[5rem] font-medium">
          Join us today and give your child the tools to succeed in a
          tech-driven world!
        </p>
        <Button className="w-[200px] mx-auto">Contact Us for More Info</Button>
      </div>
    </div>
  );
};

export default RegisterNow;
