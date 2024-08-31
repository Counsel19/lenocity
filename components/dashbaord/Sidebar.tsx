"use client";

import { FC } from "react";
import { BookCopy, Home, Images, LogOutIcon, Settings } from "lucide-react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Brand from "../shared/Brand";
import SidebarLink from "./SidebarLink";
import { Button, buttonVariants } from "../ui/button";

interface SidebarProps {}
const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    signOut({
      callbackUrl: `${window.location.origin}/login`,
    });

    router.replace("/login");
  };
  return (
    <div className="w-full text-base h-full space-y-2 text-white rounded-lg grid grid-rows-[auto_1fr]">
      <div className=" bg-orange-600 h-full rounded-lg py-8 px-4 space-y-20">
        <Brand />
        <div className="flex flex-col space-y-8 ">
          <h5 className="text-slate-200 text-md">Menu</h5>
          <SidebarLink icon={<Home />} text="Dashboard" link="/admin/dashboard" />
          <SidebarLink
            icon={<BookCopy />}
            text="Post"
            link="/admin/posts"
          />
          <SidebarLink
            icon={<Images />}
            text="Gallery"
            link="/admin/gallery"
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-col p-4  space-y-8 ">
            <h5 className="text-slate-200 text-md">Account</h5>

            <SidebarLink
              icon={<Settings />}
              text="Profile"
              link="/admin/profile"
            />
            <SidebarLink
              icon={<Settings />}
              text="Update Password"
              link="/admin/update-password"
            />
            <Button
              className={buttonVariants({
                variant: "outline",
              })}
              onClick={handleSignOut}
            >
              <LogOutIcon className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
