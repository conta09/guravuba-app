// lib/db.ts
import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return; // already connected
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI in .env.local");
  }

  return mongoose.connect(process.env.MONGODB_URI, {
    dbName: "ecommerce", // optional: name your DB
  });
}
