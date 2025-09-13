import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("testdb");
    const productsCollection = db.collection("products");

    // find last 4 products (sorted by createdAt descending)
    const products = await productsCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .toArray();

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching featured products:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
