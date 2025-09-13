import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, description, category, images, price, offerPrice, discount } =
      await req.json();

    // validation
    if (!name || !description || !category || !images || images.length < 1 || !price) {
      return NextResponse.json(
        { error: "Missing required fields (name, description, category, price, images[])" },
        { status: 400 }
      );
    }

    // connect to db (native driver, same as login)
    const client = await clientPromise;
    const db = client.db("testdb");
    const productsCollection = db.collection("products");

    // insert product
    const result = await productsCollection.insertOne({
      name,
      description,
      category,
      images,
      price,
      offerPrice,
      discount,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "✅ Product added successfully",
        productId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Add product error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
