import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck, SquareChartGantt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface ServiceCardProps {
  image: string;
  link: string;
  description: string;
  name: string;
}
const ServiceCard: FC<ServiceCardProps> = ({
  link,
  name,
  image,
  description,
}) => {
  return (
    <div className="h-[40rem] group  rounded-xl overflow-hidden shadow-xl">
      <div className="h-[50%]">
        <Image
          height={500}
          width={500}
          className="h-full object-cover "
          src={image}
          alt={name}
        />
      </div>
      <div className="p-8 space-y-6 relative">
        <h4 className="text-[1.9rem] font-bold leading-[2rem]">{name}</h4>
        <span className=" opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-1000 ease-out absolute p-5 -top-8 right-8 -translate-y-[50%] bg-orange-100 rounded-full">
          <SquareChartGantt color="#000000" />
        </span>
        <p className="text-[1.5rem] leading-[3rem] truncate-2-lines">
          {description}
        </p>
        <div className="flex justify-end">
          <Link
            href={link}
            className={cn(
              buttonVariants({
                className: "rounded-full w-[50px] h-[50px] p-4",
              })
            )}
          >
            <CircleCheck size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
