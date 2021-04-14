import { MongoClient } from "mongodb";

export const connectToDB = async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.DB_URI);
  } catch (err) {
    console.log(err);
  }
  return client;
};
