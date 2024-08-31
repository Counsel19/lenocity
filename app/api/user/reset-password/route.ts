import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import AdminUser from "@/models/AdminUser";

export const POST = async (req: NextRequest) => {
  try {
    const { userId, password } = await req.json();

    const user = await AdminUser.findOne({
      _id: userId,
    });
    if (!user) return new Response("Email Does not Exists", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await AdminUser.updateOne(
      {
        _user: user._id,
      },
      {
        password: hashedPassword,
        resetToken: null,
        passwordResetExpires: null,
      }
    );

    return new Response("Password Reset Successfull", {
      status: 200,
    });
  } catch (error) {
    return new Response("Could Reset Password, please try again", {
      status: 500,
    });
  }
};
