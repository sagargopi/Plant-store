import { NextResponse } from "next/server"
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Return empty categories during build
export const dynamic = 'force-dynamic';

export async function GET() {
  // During build, return empty array to prevent build failures
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ categories: [] });
  }

  if (!uri) {
    console.error('MongoDB URI is not configured');
    return NextResponse.json(
      { categories: [] },
      { status: 200 }
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
    // Return empty array on error to prevent build failures
    return NextResponse.json(
      { categories: [] },
      { status: 200 }
    );
  } finally {
    await client.close().catch(console.error);
  }
}
