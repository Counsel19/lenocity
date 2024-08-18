import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import NavbarMobile from "@/components/shared/NavbarMobile";
import React, { FC } from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}
const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="relative  ">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden">
        <NavbarMobile />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
