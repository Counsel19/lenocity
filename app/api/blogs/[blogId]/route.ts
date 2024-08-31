import { getAuthSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import BlogPost from "@/models/Post";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const { blogId } = params;
  try {
    await connectDB();
    const session = await getAuthSession();

    if (!session || !session.user) {
      return new Response("You must be Logged in ", {
        status: 401,
      });
    }

    if (session?.user.role === "admin" || session?.user.role === "superadmin") {
      // Query the database for the paginated data

      const blog = await BlogPost.findById(blogId).populate("author");

      return new Response(JSON.stringify({ blog }), {
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
