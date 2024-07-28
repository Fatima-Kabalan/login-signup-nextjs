import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default async function connectMongodb() {
  try {
    if (!MONGO_URI) {
      throw new Error("Please define MONGO_URI environment variable!");
    }

    if (mongoose.connections[0].readyState) {
      console.log("MongoDB connection already established.");
      return;
    }

    await mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });

    console.log("🎉 MongoDB connected successfully! 🎉");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
}