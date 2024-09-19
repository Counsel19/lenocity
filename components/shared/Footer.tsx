"use client";

import { FC } from "react";

import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import Brand from "./Brand";
import { Phone } from "lucide-react";

interface FooterProps {}
const Footer: FC<FooterProps> = () => {
  const { userProfile } = useSelector((store: RootState) => store.auth);

  const quickLinks = [
    {
      text: "All Services",
      link: "/services",
      noAuth: false,
    },
    {
      text: "Contact Us ",
      link: "/contact",
      noAuth: false,
    },
    {
      text: "Blogs",
      link: "/blogs",
      noAuth: false,
    },
 
    {
      text: "Login",
      link: "/login",
      noAuth: true,
    },
  ];

  return (
    <div className="bg-orange-100 text-slate-800 text-base  mt-[8rem]">
      <div className="w-frame py-16 flex flex-col lg:flex-row gap-16 justify-between">
        <div className="flex flex-col gap-8"> 
          <Brand  />
          <span className="text-[1.6rem]">
            Interactive Courses, Real-World Skills
          </span>
        </div>

        <div className="lg:w-[60%] flex text-slate-800 ">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-12">
              {quickLinks.map((linkItem, index) => (
                <Link
                  className="text-[1.6rem] lg:text-[1.6rem] leading-[2.34rem] hover:underline"
                  key={index}
                  href={linkItem.link}
                >
                  {linkItem.text}
                </Link>
              ))}
            </div>
            <div className="space-y-10">
              <div className="flex flex-col gap-8">
                <span className="rounded-full grid border-slate-800 place-content-center border h-[2.8rem] w-[2.8rem]">
                  <Phone size={16} />
                </span>

                <span className=" font-semibold text-[1.6rem]">
                  • +2348182556227 • +447405207633
                </span>
              </div>
              <div className="flex gap-8">
                <span className="rounded-full grid place-content-center border border-slate-800 h-[3rem] w-[3rem]">
                  <FaLinkedin size={20} />
                </span>
                <span className="rounded-full grid place-content-center border border-slate-800 h-[3rem] w-[3rem]">
                  <FaInstagram size={20} />
                </span>
                <Link target="_blank" href="https://www.facebook.com/profile.php?id=100093835788377" className="rounded-full grid place-content-center border border-slate-800 h-[3rem] w-[3rem]">
                  <FaFacebookF size={20} />
                </Link>
                <Link target="_blank" href="https://www.youtube.com/@Lenocity" className="rounded-full grid place-content-center border border-slate-800 h-[3rem] w-[3rem]">
                  <FaYoutube size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-slate-800 w-frame py-2">
        <hr className=" mb-6" />
        <div className="flex justify-center items-center ">
          <span>&copy; Lenocity 2024</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
