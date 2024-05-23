import supertest from "supertest";
import application from "../src/application/application";
import { connection } from "../src/db/configs/connection";
describe("API /v1/products", () => {
  let X_API_TOKEN;
  beforeEach(async () => {
    await connection.truncate({ cascade: true });
    await supertest(application)
      .post("/v1/auth-and-create-address")
      .send({
        firstName: "abdillah",
        lastName: "Alli",
        email: "another@gmail.com",
        password: "secreet-pass",
        Address: {
          country: "Indonesian",
          province: "East java",
          city: "Surabaya",
          vilage: "Konoha",
        },
      });
    const response = await supertest(application).post("/v1/auth/login").send({
      email: "another@gmail.com",
      password: "secreet-pass",
    });
    X_API_TOKEN = response.body.token;
  });

  it("shoud can insert product", async () => {
    const response = await supertest(application)
      .post("/v1/products")
      .send({
        name: "Rinso",
        category: "Sembako",
      })
      .set({ "X-API-TOKEN": X_API_TOKEN });
    expect(response.body.name).toBe("Rinso");
    expect(response.body.category).toBe("Sembako");
  });
});
