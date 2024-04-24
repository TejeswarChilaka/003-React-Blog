import { MongoClient } from "mongodb";
let db;

async function connectToDb(cb) {
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.5b71r3f.mongodb.net/`
  );
  await client.connect();
  db = client.db("react-blog-db");

  cb();
}

export { db, connectToDb };
