import { NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import { adminUserSchema } from "@/models/AdminUser";

import BlogPost from "@/models/Post";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const currentPage = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = 10;
  const skip = (currentPage - 1) * limit;
  try {
    await connectDB();

    // Force registration of AdminUser model before any queries
    if (!mongoose.models.AdminUser) {
      mongoose.model("AdminUser", adminUserSchema);
    }

    // Query the database for the paginated data
    const [blogs, total] = await Promise.all([
      BlogPost.find().populate("author").skip(skip).limit(limit), // Get the current page of items
      BlogPost.countDocuments(), // Get the total number of items
    ]);

    const numberOfPages = Math.ceil(total / limit);

    return new Response(
      JSON.stringify({ blogs, total, numberOfPages, currentPage }),
      {
        status: 200,
      }
    );
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

export async function POST(req: NextRequest) {
  const resbody = await req.json();

  const { title, body, image } = resbody;
  try {
    await connectDB();
    const session = await getAuthSession();

    if (!session || !session?.user) {
      return new Response("You Must be Logged in to access this", {
        status: 401,
      });
    }
    if (!title || !body || !image) {
      return new Response("Please Provide all Fields", {
        status: 400,
      });
    }

    const postTitleExist = await BlogPost.findOne({ title: title });

    if (postTitleExist) {
      return new Response("Post with Title Already Exist", {
        status: 400,
      });
    }

    const blog = await BlogPost.create({
      title,
      body,
      image,
      author: session.user.id,
    });

    return new Response(JSON.stringify({ blog }), {
      status: 201,
    });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not create post, please try again",
      {
        status: 500,
      }
    );
  }
}
