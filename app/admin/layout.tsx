"use client";

import Header from "@/components/dashbaord/Header";
import MobileSidebar from "@/components/dashbaord/MobileSidebar";
import Sidebar from "@/components/dashbaord/Sidebar";
import CustomBreadCrumb from "@/components/shared/CustomBreadCrumbs";
import { toast } from "@/components/ui/use-toast";
import { getSingleUser } from "@/lib/redux/slices/auth/authThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useSession } from "next-auth/react";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface layoutProps {
  children: React.ReactNode;
}
const Layout: FC<layoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile } = useSelector((store: RootState) => store.auth);
  const { data: session } = useSession();
  const { showMobileSidebar } = useSelector((store: RootState) => store.modal);
  
  
  useEffect(() => {
    const getUserInfo = async () => {
      if (!session?.user?._id) return;
      try {
        if (!userProfile) {
          dispatch(getSingleUser(session?.user?._id));
        }
      } catch (error) {
        return toast({
          title: "Somthing went wrong",
          description: "Unable to get user information",
          variant: "destructive",
        });
      }
    };

    getUserInfo();
  }, [session]);

  return (
    <div className="bg-slate-200 p-2 relative">
      <div className="flex gap-2 ">
        <div className="lg:min-w-[220px] h-full hidden lg:block">
          <Sidebar />
        </div>

        {showMobileSidebar ? (
          <div className="md:hidden grid fixed overflow-hidden  z-50 top-0 bottom-0 right-0 left-0">
            <MobileSidebar />
          </div>
        ) : null}

        <div className="w-full">
          <div className="h-fit mb-4">
            <Header />
            <CustomBreadCrumb
              homeElement={""}
              separator={<span> | </span>}
              activeClasses="text-emerald-500"
              containerClasses="flex py-3 bg-trasparent text-md text-slate-700"
              listClasses="hover:underline mx-2 font-bold"
              capitalizeLinks
            />
          </div>
          <div className="m-[2rem]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
