"use client";

import { FC, useState } from "react";
import UserPasswordForm from "@/components/account/molecules/UserPasswordForm";

interface AccountProps {}
const Account: FC<AccountProps> = () => {
  const [isEditingMode, setIsEditingMode] = useState(false);

  return (
    <div className="p-8 bg-white h-full">
      <h3 className="mb-8 font-bold text-[2rem]">
        Update your Password
      </h3>

      <UserPasswordForm />
    </div>
  );
};

export default Account;
