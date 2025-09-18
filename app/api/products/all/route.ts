import { NextResponse } from "next/server";
import clientPromise from "@/lib/db"; // your MongoDB connection

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("testdb");
    const productsCollection = db.collection("products");

    // Fetch only primaryImage, name, description
    const products = await productsCollection
      .find({}, { projection: { primaryImage: 1, name: 1, description: 1 } })
      .toArray();

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error("❌ Fetch products error:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
