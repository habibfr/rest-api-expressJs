import { connection } from "../src/db/models/model-syncronization.js";
describe("DB testing", () => {
  it("shoud can be connect to db", async () => {
    await connection.sync({ force: true, alter: false });
  });
});
