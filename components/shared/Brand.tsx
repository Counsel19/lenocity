import Link from "next/link";
import { FC } from "react";

interface BrandProps {}
const Brand: FC<BrandProps> = ({}) => {
  return (
    <div className="text-3xl font-bold ">
      <Link href={"/"}>Lenocity</Link>
    </div>
  );
};

export default Brand;
