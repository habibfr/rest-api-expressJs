import supertest from "supertest";
import application from "../src/application/application";
import { connection } from "../src/db/configs/connection";
describe("API /v1/addresses", () => {
  let X_API_TOKEN;
  beforeEach(async () => {
    await connection.truncate({ cascade: true });
    await supertest(application)
      .post("/v1/auth")
      .send({
        firstName: "abdillah",
        lastName: "Alli",
        email: "another@gmail.com",
        password: "secreet-pass",
      });
    const response = await supertest(application).post("/v1/auth/login").send({
      email: "another@gmail.com",
      password: "secreet-pass",
    });
    X_API_TOKEN = response.body.token;
  });
  it("should can insert address", async () => {
    const response = await supertest(application)
      .post("/v1/addresses")
      .send({
        country: "Indonesian",
        province: "East java",
        city: "Surabaya",
        vilage: "Konoha",
      })
      .set({ "X-API-TOKEN": X_API_TOKEN });
      expect(response.body.country).toBe("Indonesian");
      expect(response.body.province).toBe("East java");
      expect(response.body.city).toBe("Surabaya");
      expect(response.body.vilage).toBe("Konoha");
      expect(response.status).toBe(201);
  });
});
