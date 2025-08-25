// lib/mongodb.ts
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// Log connection info (masking password for security)
const maskedUri = process.env.MONGODB_URI.replace(/:([^:]+)@/, ':****@');
console.log('MongoDB URI:', maskedUri.startsWith('mongodb') ? 'Valid' : 'Invalid scheme');

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false, // Changed from true to false for better compatibility
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection across HMR
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    try {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
      console.log('Created new MongoDB connection in development');
    } catch (e) {
      console.error('Failed to create MongoDB client in development:', e);
      throw e;
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  // In production, always create a new connection
  try {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
    console.log('Created new MongoDB connection in production');
  } catch (e) {
    console.error('Failed to create MongoDB client in production:', e);
    throw e;
  }
}

export default clientPromise;
