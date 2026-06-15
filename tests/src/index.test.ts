import { expect, inject, test } from "vitest";
import { MongoClient, ObjectId } from "mongodb";

test("expect inject('MONGO_URI') to be defined", () => {
  expect(inject("MONGO_URI")).toBeDefined();
});

test("mongodb", async ({ onTestFinished }) => {
  // arrange
  const client = new MongoClient(inject("MONGO_URI"));
  await client.connect();
  onTestFinished(async () => {
    await client.db("test").dropDatabase();
    await client.close();
  });
  // act
  await client.db("test").collection("test").insertOne({
    foo: "bar",
  });
  // assert
  expect(await client.db("test").collection("test").findOne({})).toEqual({
    _id: expect.any(ObjectId),
    foo: "bar",
  });
});
