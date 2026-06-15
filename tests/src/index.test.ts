import { expect, inject, onTestFinished, test } from "vitest";
import { MongoClient, ObjectId } from "mongodb";

test("expect inject('MONGO_URI') to be defined", () => {
  expect(inject("MONGO_URI")).toBeDefined();
});

async function withMongoClient() {
  const client = new MongoClient(inject("MONGO_URI"));
  await client.connect();
  onTestFinished(async () => {
    await client.db("test").dropDatabase();
    await client.close();
  });
  return client;
}

test("mongodb", async () => {
  // arrange
  const client = await withMongoClient();
  // act
  await client.db("test").collection("test").insertOne({ foo: "bar" });
  // assert
  expect(await client.db("test").collection("test").findOne({})).toEqual({
    _id: expect.any(ObjectId),
    foo: "bar",
  });
});
