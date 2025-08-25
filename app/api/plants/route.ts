import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Plant } from "@/lib/models/Plant"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Attempting to connect to MongoDB...")
    const client = await clientPromise
    console.log("[v0] MongoDB connection successful")

    const db = client.db("plant_store")
    const { searchParams } = new URL(request.url)

    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const inStock = searchParams.get("inStock")

    // Build MongoDB query
    const query: any = {}

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { categories: { $regex: search, $options: "i" } }]
    }

    if (category && category !== "all") {
      query.categories = { $in: [category] }
    }

    if (inStock === "true") {
      query.inStock = { $ne: false }
    }

    console.log("[v0] MongoDB query:", JSON.stringify(query, null, 2))
    const plants = await db.collection("plants").find(query).toArray()
    console.log("[v0] Found plants:", plants.length)
    
    // Debug: Log first plant's data
    if (plants.length > 0) {
      console.log("[v0] First plant data:", {
        name: plants[0].name,
        image: plants[0].image,
        hasImage: !!plants[0].image,
        allFields: Object.keys(plants[0])
      })
    }

    return NextResponse.json({ plants })
  } catch (error) {
    console.error("[v0] Error fetching plants:", error)
    return NextResponse.json({ error: "Failed to fetch plants" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("plant_store")
    const body = await request.json()

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

    const result = await db.collection("plants").insertOne(plant)

    return NextResponse.json({
      success: true,
      plantId: result.insertedId,
    })
  } catch (error) {
    console.error("Error adding plant:", error)
    return NextResponse.json({ error: "Failed to add plant" }, { status: 500 })
  }
}
