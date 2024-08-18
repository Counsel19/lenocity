"use client";

import { FC } from "react";

import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import Brand from "./Brand";

interface FooterProps {}
const Footer: FC<FooterProps> = () => {
  const { userProfile } = useSelector((store: RootState) => store.auth);

  return (
    <div className="bg-blue-50 text-slate-800 text-base  mt-[8rem]">
      <div className="w-frame py-16 flex flex-col lg:flex-row gap-16 justify-between">
        <div className="flex flex-col gap-8">
          <Brand />
          <span className="text-[1.6rem]">
            Interactive Courses, Real-World Skills
          </span>

          <div className="flex items-center gap-4">
            <Link href={"/"}>
              <FaFacebookF size={22} className="text-slate-800" />
            </Link>
            <Link href={"/"}>
              <RiInstagramFill size={22} className="text-slate-800" />
            </Link>
            <Link href={"/"}>
              <FaTiktok size={22} className="text-slate-800" />
            </Link>
          </div>
        </div>
        <div className="flex gap-16 lg:gap-20 flex-wrap">
          <div className=" flex flex-col gap-8">
            <Link href={"/services"}>All Services</Link>
          </div>
          <div className=" flex flex-col gap-8">
            <Link href={"/contact"}>Contact Us </Link>
            <Link href={"/blogs"}>Blog </Link>
          </div>
          <div className=" flex flex-col gap-8">
            {userProfile ? (
              <Link href={"/admin/account"}>Account </Link>
            ) : (
              <Link href={"/login"}>Login </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center p-4 justify-center border-t border-[#00470C]">
        &copy; Copyright 2024
      </div>
    </div>
  );
};

export default Footer;
