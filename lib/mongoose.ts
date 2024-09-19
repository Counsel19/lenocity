import mongoose from "mongoose";

const { MONGODB_URL } = process.env;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    // Already connected or connecting, reuse the existing connection
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error", error);
    throw new Error("Could not connect to database");
  }
};
