import { connectDB } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    await connectDB() 
    const body = await req.json();

    const { email, password, name } = body;

    const isExist = await AdminUser.findOne({
      email,
    });

    if (isExist) return new Response("User already exists", { status: 400 });

    const hashedEmail = crypto.createHash("md5").update(email).digest("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new AdminUser({
      email,
      password: hashedPassword,
      name,
      image: `https://www.gravatar.com/avatar/${hashedEmail}"?d=mp`,
    });
    await user.save();

    const token = await user.createJWT();

    user.password = undefined;

    return new Response(JSON.stringify({ user, token }), { status: 201 });
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
