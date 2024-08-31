import { NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Gallery from "@/models/Gallery";

export async function GET(req: NextRequest) {
  const currentPage = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = 10;
  const skip = (currentPage - 1) * limit;
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
      const [gallery, total] = await Promise.all([
        Gallery.find().populate("uploadedBy").skip(skip).limit(limit), // Get the current page of items
        Gallery.countDocuments(), // Get the total number of items
      ]);

      const numberOfPages = Math.ceil(total / limit);

      return new Response(
        JSON.stringify({ gallery, total, numberOfPages, currentPage }),
        {
          status: 200,
        }
      );
    } else {
      return new Response("You cannot access this resource", {
        status: 403,
      });
    }
  } catch (error) {
    return new Response("Could not get transactions, Please try again", {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const resbody = await req.json();

  const { title, image } = resbody;
  try {
    const session = await getAuthSession();

    if (!session || !session?.user) {
      return new Response("You Must be Logged in to access this", {
        status: 401,
      });
    }
    if (!title || !image) {
      return new Response("Please Provide all Fields", {
        status: 400,
      });
    }

    const galleryItemExist = await Gallery.findOne({ title: title });

    if (galleryItemExist) {
      return new Response("Gallery Image with Title Already Exist", {
        status: 400,
      });
    }

    const galleryItem = await Gallery.create({
      title,
      image,
      uploadedBy: session.user._id,
    });

    return new Response(JSON.stringify({ galleryItem }), {
      status: 201,
    });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not create Gallery Item, please try again",
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  const { galleryId } = body;

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

    await Gallery.findByIdAndUpdate(galleryId, body);

    return new Response("OK", {
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    return new Response(
      err?.message || "Could not update Gallery Item, please try again",
      {
        status: 500,
      }
    );
  }
}
