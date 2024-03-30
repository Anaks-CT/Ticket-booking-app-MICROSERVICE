import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

// tets gonna run before all test
let mongo: any;
beforeAll(async () => {
  // we are setting this here to run the tests since envs are set when starting the pod
  process.env.JWT_SECRET_KEY = "randomkey";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

// test gonna run before each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// stop the mongoserver and disconnect it
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
