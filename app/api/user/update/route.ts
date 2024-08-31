import { getAuthSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";

import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const resbody = await req.json();
    await connectDB();
    const session = await getAuthSession();

    if (!session || !session.user) {
      return new Response("You must be Logged in ", {
        status: 401,
      });
    }

    if (session?.user.role === "admin" || session?.user.role === "superadmin") {
      // Query the database for the paginated data

      const user = await AdminUser.findByIdAndUpdate(
        session?.user.id,
        resbody,
        {
          new: true,
        }
      );

      return new Response(JSON.stringify({ user }), {
        status: 200,
      });
    } else {
      return new Response("You cannot access this resource", {
        status: 403,
      });
    }
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
