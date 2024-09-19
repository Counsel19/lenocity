import mongoose from "mongoose";


const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      required: true,
    },
    image: {
      type: String,
    },

    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BlogPost = mongoose.models.BlogPost ||  mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
