import { NextResponse } from "next/server"
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function GET() {
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
    
    // Get unique categories from all plants
    const categories = await db.collection("plants").distinct("category");
    
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
