import { FC } from "react";
import ServiceCard from "./ServiceCard";
import { IService } from "@/types/services";

interface ServicesGridProps {
  services: IService[];
}
const ServicesGrid: FC<ServicesGridProps> = ({ services }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-10">
      {services.map((item) => (
        <ServiceCard key={item._id} {...item} />
      ))}
    </div>
  );
};

export default ServicesGrid;
