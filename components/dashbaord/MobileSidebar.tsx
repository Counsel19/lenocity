import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { TailSpin } from "react-loader-spinner";
import {  cn } from "@/lib/utils";

import { ChevronLeft, Link, Sidebar } from "lucide-react";
import { setShowMobileSidebar } from "@/lib/redux/slices/modalSlice";
import { buttonVariants } from "../ui/button";
import UserAvatar from "./atoms/UserAvatar";

interface MobileSidebarProps {}
const MobileSidebar: FC<MobileSidebarProps> = ({}) => {
  const { userProfile } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-white text-black overflow-scroll">
      <div className="flex w-full p-4 flex-col gap-4">
        <button
          onClick={() => dispatch(setShowMobileSidebar(false))}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </button>
        {userProfile ? (
          <div className="border-2 border-slate-900 p-4 rounded-lg flex flex-col gap-4 items-center justify-center">
            <UserAvatar
              imgUrl={userProfile.image}
              name={userProfile.name}
              width="w-12"
            />
            <div className="flex flex-col space-y-1 text-center leading-none">
              {userProfile.name && (
                <p className="font-medium">{userProfile.name}</p>
              )}
              {userProfile.email && (
                <p className="w-[200px] truncate text-sm text--zinc-700">
                  {userProfile.email}
                </p>
              )}
            </div>
          </div>
        ) : (
          <TailSpin width={10} height={10} />
        )}

        <div className="w-full my-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
