"use client";

import { FC, useState } from "react";
import { AlignJustify, X } from "lucide-react";
import { Button } from "../ui/button";
import Brand from "./Brand";
import Link from "next/link";

interface NavbarMobileProps {}
const NavbarMobile: FC<NavbarMobileProps> = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="flex p-4  justify-between items-center">
      <Brand />

      <Button onClick={() => setShowNav(true)} variant={"ghost"}>
        <AlignJustify />
      </Button>

      {showNav && (
        <div className="fixed   z-50 top-0 bottom-0 right-0 left-0 bg-[#000000D6]">
          <div className="p-12 space-y-20">
            <div className="flex justify-between items-center">
              <Brand />

              <Button onClick={() => setShowNav(false)} variant={"ghost"}>
                <X className="text-white" />
              </Button>
            </div>

            <ul className="flex flex-col gap-8  items-center text-base font-semibold">
              <li>
                <Link
                  onClick={() => setShowNav(false)}
                  href={"/"}
                  className="px-8 py-4 text-white rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setShowNav(false)}
                  href={"/services"}
                  className="px-8 py-4 text-white  rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setShowNav(false)}
                  href={"/blogs"}
                  className="px-8 py-4 text-white  rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setShowNav(false)}
                  href={"/gallery"}
                  className=" px-8 py-4 text-white  rounded-[3rem] border border-transparent hover:text-orange-500 hover:border-orange-500 "
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setShowNav(false)}
                  href={"/contact"}
                  className="px-8 py-4  bg-orange-500 text-white rounded-[3rem] border border-transparent hover:bg-transparent hover:text-orange-500 hover:border-orange-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
