import { connectDB } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return new Response("Incomplete Details", { status: 400 });
    }

    const user = await AdminUser.findOne({
      email,
    }).select("+password");

    if (!user) {
      return new Response("User does not exist", { status: 404 });
    }

    // Compare user passowrd
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(isPasswordMatch, "isPasswordMatch");
    console.log(password, user.password, "password");
    if (!isPasswordMatch) {
      return new Response(
        "Incorrect Password entered, Please put in the correct password",
        { status: 401 }
      );
    }

    const token = await user.createJWT();

    user.password = undefined;

    return new Response(JSON.stringify({ user, token }), { status: 200 });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not register user, please try again",
      {
        status: 500,
      }
    );
  }
}
