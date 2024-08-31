import { getAuthSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcrypt";

import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { currentPassword, newPassword, newPasswordConfirmation } =
      await req.json();

    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      return new Response("Please Supply all fields ", {
        status: 400,
      });
    }
    await connectDB();
    const session = await getAuthSession();

    if (!session || !session.user) {
      return new Response("You must be Logged in ", {
        status: 401,
      });
    }

    const user = await AdminUser.findOne({
      _id: session.user._id,
    }).select("+password");

    if (!user) {
      return new Response("User does not exist", { status: 404 });
    }

    // Compare user passowrd
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return new Response(
        "Incorrect Password entered, Please put in the correct password",
        { status: 401 }
      );
    }

    if (newPassword != newPasswordConfirmation) {
      return new Response("Password do not Match", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await AdminUser.findByIdAndUpdate(session?.user._id, {
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ message: "Update Successfull" }), {
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not update User Profile, Please try again",
      {
        status: 500,
      }
    );
  }
}
