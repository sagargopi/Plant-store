import { type NextRequest, NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import type { Plant } from "@/lib/models/Plant";

const uri = process.env.MONGODB_URI;

export async function GET(request: NextRequest) {
  if (!uri) {
    return NextResponse.json(
      { error: "MongoDB connection string is not configured" },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: '1',
      strict: false,
      deprecationErrors: true,
    },
    tls: true,
    tlsAllowInvalidCertificates: true,
  });

  try {
    await client.connect();
    const db = client.db("plant_store");
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const inStock = searchParams.get("inStock");

    // Build MongoDB query
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { categories: { $regex: search, $options: "i" } }
      ];
    }

    if (category && category !== "all") {
      query.categories = { $in: [category] }
    }

    if (inStock === "true") {
      query.inStock = { $ne: false };
    }

    const plants = await db.collection<Plant>("plants").find(query).toArray();
    return NextResponse.json({ plants });
  } catch (error) {
    console.error("Error fetching plants:", error);
    return NextResponse.json(
      { error: "Failed to fetch plants" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: NextRequest) {
  if (!uri) {
    return NextResponse.json(
      { error: "MongoDB connection string is not configured" },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: '1',
      strict: false,
      deprecationErrors: true,
    },
    tls: true,
    tlsAllowInvalidCertificates: true,
  });

  try {
    const body = await request.json();
    await client.connect();
    const db = client.db("plant_store");
    
    const plant: Plant = {
      name: body.name,
      price: Number.parseFloat(body.price),
      categories: Array.isArray(body.categories) ? body.categories : [body.categories],
      inStock: body.inStock === true || body.inStock === "true",
      description: body.description || "",
      image: body.image || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Plant>("plants").insertOne(plant);
    return NextResponse.json({
      success: true,
      plantId: result.insertedId,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating plant:", error);
    return NextResponse.json(
      { error: "Failed to create plant" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
