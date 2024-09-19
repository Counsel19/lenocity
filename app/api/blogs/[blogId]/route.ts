import { getAuthSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import { adminUserSchema } from "@/models/AdminUser";
import BlogPost from "@/models/Post";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const { blogId } = params;
  try {
    await connectDB();

    if (!mongoose.models.AdminUser) {
      mongoose.model("AdminUser", adminUserSchema);
    }

    // Query the database for the paginated data

    const blog = await BlogPost.findById(blogId).populate("author");

    return new Response(JSON.stringify({ blog }), {
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not get Blog Post, Please try again",
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const body = await req.json();

  const { blogId } = params;

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

    const blog = await BlogPost.findByIdAndUpdate(blogId, body, { new: true });

    return new Response(JSON.stringify({ message: "Success", blog }), {
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not update post, please try again",
      {
        status: 500,
      }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const { blogId } = params;

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

    await BlogPost.findByIdAndDelete(blogId);

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not Delete post, please try again",
      {
        status: 500,
      }
    );
  }
}
