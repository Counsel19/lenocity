"use client";

import Brand from "@/components/shared/Brand";
import LabledInput from "@/components/shared/LabledInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { FormSubmitHandler } from "@/types/event";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [router, status]);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValue({ ...inputValue, [name]: value });
  };

  const loginWithCredentials: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!inputValue.email || !inputValue.password) {
        return toast({
          title: "Invlid Input",
          description: "You haved not entered all fields",
          variant: "destructive",
        });
      }

      const res = await signIn(`credentials`, {
        ...inputValue,
        redirect: false,
      });

      if (res?.error) {
        return toast({
          title: "Error Signing Up",
          description: res?.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Signing Up",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Login in",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 h-screen overflow-hidden">
      <div className="space-y-12 p-12">
        <div className=" w-full">
          <div className="space-y-12 h-full mx-auto w-full lg:w-[70%]">
            <div className="w-[15.1rem]">
              <Brand />
            </div>
            <div className="h-fit my-auto  space-y-12">
              <h3 className="font-semibold text-[2rem] text-center leading-[3.8rem]">
                Login
              </h3>

              <p className="text-[1.6rem] leading-[1.6rem] text-[#667085]">
                Welcome back! Please enter your details.
              </p>

              <form onSubmit={loginWithCredentials} className="space-y-8">
                <LabledInput
                  label="Email"
                  name="email"
                  value={inputValue.email}
                  setInputValue={handleOnchange}
                />
                <LabledInput
                  label="Password"
                  value={inputValue.password}
                  name="password"
                  type="password"
                  setInputValue={handleOnchange}
                />

                <div className="flex justify-end">
                  <Link
                    className="font-medium text-base leading-[2rem] text-[#F6453C]"
                    href="/forgot-password"
                  >
                    Forgot Password
                  </Link>
                </div>

                <Button type="submit" isLoading={isLoading} className="w-full">
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/images/bg-abstract.jpg')] object-cover bg-orange-900 bg-opacity-70" />
    </div>
  );
};

export default Login;
