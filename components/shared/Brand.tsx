import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BrandProps {}
const Brand: FC<BrandProps> = ({}) => {
  return (
    <div className="text-3xl font-bold ">
      <Link href={"/"}>
        <Image className="h-[10rem] w-[10rem]" alt="LOgo" width={200} height={200} src={"/images/logo-nobg.png"} />
      </Link>
    </div>
  );
};

export default Brand;
