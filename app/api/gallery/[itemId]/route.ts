import { getAuthSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Gallery from "@/models/Gallery";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const { itemId } = params;

  try {
    await connectDB();
    const session = await getAuthSession();

    if (!session || !session?.user) {
      return new Response("You Must be Loged in to access this", {
        status: 401,
      });
    }
    if (session?.user.role !== "admin") {
      return new Response("You cannot acccess this resource", {
        status: 403,
      });
    }

    await Gallery.findByIdAndDelete(itemId);

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not Delete Gallery Item, please try again",
      {
        status: 500,
      }
    );
  }
}