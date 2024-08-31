"use client";

import { FC, useState } from "react";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfileForm from "@/components/account/molecules/UserProfileForm";

interface AccountProps {}
const Account: FC<AccountProps> = () => {
  const [isEditingMode, setIsEditingMode] = useState(false);

  return (
    <div className="p-8 bg-white h-full">
      <h3 className="mb-8 font-bold text-[2rem]">
        View and Update your Profile
      </h3>

      {!isEditingMode && (
        <div className="flex justify-end mb-8 ">
          <div className="flex gap-4 ">
            <Button className="gap-3" onClick={() => setIsEditingMode(true)}>
              <Pencil size={20} /> Edit
            </Button>
          </div>
        </div>
      )}

      <UserProfileForm
        setIsEditingMode={setIsEditingMode}
        readonly={!isEditingMode}
      />
    </div>
  );
};

export default Account;
