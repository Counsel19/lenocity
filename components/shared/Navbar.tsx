import { FC } from "react";
import Brand from "./Brand";
import Link from "next/link";

interface NavbarProps {}
const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="py-[4rem] z-50 relative flex justify-between items-center w-frame ">
      <Brand />

      <ul className="flex items-center text-base gap-6 font-semibold">
        <li>
          <Link href={"/"} className="px-8 py-4 rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500">Home</Link>
        </li>
        <li>
          <Link href={"/services"} className="px-8 py-4 rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500">Services</Link>
        </li>
        <li>
          <Link href={"/blogs"} className="px-8 py-4 rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500">Blog</Link>
        </li>
        <li>
          <Link href={"/gallery"} className=" px-8 py-4 rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500 ">Gallery</Link>
        </li>
        <li>
          <Link href={"/contact"} className="px-8 py-4 bg-orange-500 text-white rounded-[3rem] border border-transparent hover:bg-transparent hover:text-orange-500 hover:border-orange-500">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
