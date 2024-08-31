"use client";

import { FC } from "react";
import Brand from "./Brand";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {}
const Navbar: FC<NavbarProps> = ({}) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="py-[1.5rem] z-50 relative flex justify-between items-center w-frame ">
        <Brand />

        <ul className="flex items-center text-base gap-6 font-semibold">
          <li>
            <Link
              href={"/"}
              className={` link ${
                pathname === "/" ? "active text-orange-500" : ""
              } px-8 py-4 rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/services"}
              className={` link ${
                pathname === "/services" ? "active text-orange-500" : ""
              } px-8 py-4 rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href={"/blogs"}
              className={` link ${
                pathname === "/blogs" ? "active text-orange-500" : ""
              } px-8 py-4 rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500`}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href={"/gallery"}
              className={` link ${
                pathname === "/gallery" ? "active text-orange-500" : ""
              } px-8 py-4 rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500`}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href={"/contact"}
              className={` link ${
                pathname === "/contact" ? "active text-orange-500" : ""
              } px-8 py-4 bg-orange-500 text-white rounded-[3rem] border border-transparent hover:bg-transparent hover:text-orange-500 hover:border-orange-500`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
