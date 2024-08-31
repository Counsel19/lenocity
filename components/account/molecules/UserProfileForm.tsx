"use client";

import { FC, useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  getSingleUser,
  updateUserProfileDetails,
} from "@/lib/redux/slices/auth/authThunk";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

interface UserProfileFormProps {
  readonly?: boolean;
  setIsEditingMode: (value: boolean) => void;
}
const UserProfileForm: FC<UserProfileFormProps> = ({
  readonly,
  setIsEditingMode,
}) => {
  const { userProfile, isLoading } = useSelector(
    (store: RootState) => store.auth
  );
  const { data: session } = useSession();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userProfile) {
      setUserInfo({
        name: userProfile?.name || "",
        email: userProfile?.email || "",
      });
    }
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!userProfile?.email || !userProfile?.name) {
        return toast({
          title: "Invlid Input",
          description: "You haved not entered all fields",
          variant: "destructive",
        });
      }

      const res = await dispatch(updateUserProfileDetails(userInfo));
      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });

      session?.user?.id && dispatch(getSingleUser(session?.user?.id));
      toast({
        title: "Profile Update Success",
        description: "You have Updated your profile successfully",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Updaying Info",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }
    }
  };
  return (
    <form
      onSubmit={handleUpdate}
      className="space-y-6 py-12 text-base border-t border-b font-medium"
    >
      {userProfile && (
        <>
          <div className="grid items-center gap-3 md:grid-cols-[1fr_2fr]">
            <label htmlFor="">Name</label>
            <div className="flex gap-4 items-center md:w-[70%]">
              <Input
                value={userInfo.name}
                onChange={handleChange}
                readOnly={readonly}
                name="name"
                placeholder="Name"
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <hr />
          <div className="grid items-center gap-3 md:grid-cols-[1fr_2fr]">
            <label htmlFor="">Email Address</label>

            <div className="border rounded-lg flex items-center gap-3 px-6 py-4  h-18 md:w-[70%]">
              <Mail className="text-gray-500" />
              <Input
                value={userInfo.email}
                onChange={handleChange}
                name="email"
                readOnly={readonly}
                placeholder="Email"
                className=" focus-visible:ring-0 focus-visible:ring-offset-0 border-0 py-0 m-0"
              />
            </div>
          </div>

          {!readonly && (
            <div className="flex justify-end ">
              <div className="flex gap-4 ">
                <Button
                  onClick={() => setIsEditingMode(false)}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button isLoading={isLoading}>Update</Button>
              </div>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default UserProfileForm;
