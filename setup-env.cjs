require('dotenv').config();
const { MongoClient } = require('mongodb');
const plants = require('./scripts/seed-production.cjs');

async function seedDatabase() {
  let client;
  
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('plant_store');
    
    // Clear existing plants
    await db.collection('plants').deleteMany({});
    console.log('Cleared existing plants');

    // Make sure plants is an array
    const plantsArray = Array.isArray(plants) ? plants : [];
    
    if (plantsArray.length === 0) {
      throw new Error('No plants data found in seed file');
    }
    
    // Insert plants one by one to avoid issues with insertMany
    const result = await db.collection('plants').insertMany(plantsArray);
    console.log(`Successfully inserted ${result.insertedCount} plants`);

    // Verify the first plant's data
    const firstPlant = await db.collection('plants').findOne();
    console.log('First plant in database:', {
      name: firstPlant?.name,
      image: firstPlant?.image,
      hasImage: !!firstPlant?.image,
      allFields: firstPlant ? Object.keys(firstPlant) : []
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

seedDatabase();
