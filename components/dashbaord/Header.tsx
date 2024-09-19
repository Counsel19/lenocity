import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/auth/authSlice";
import UserAvatar from "./atoms/UserAvatar";
import { openModal, setShowMobileSidebar } from "@/lib/redux/slices/modalSlice";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";


interface HeaderProps {}
const Header: FC<HeaderProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter()

  return (
    <div className="w-full py-4 bg-[#fff] flex justify-between items-center">
      <div className="flex gap-3 ">
        <Button
          className="lg:hidden"
          onClick={() => dispatch(setShowMobileSidebar(true))}
        >
          <Menu />
        </Button>
      </div>
      <div className="flex gap-4 items-center mr-4 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} className="  flex gap-2 justify-center ">
              <UserAvatar imgUrl="" name="Admin" />
              <span>Admin</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 rounded-3xl p-4">
            <div>
              <Button onClick={() => {
                router.push("/login")
                dispatch(logout())
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
                });
            
                router.replace("/login");
              }} variant={"ghost"}>
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
