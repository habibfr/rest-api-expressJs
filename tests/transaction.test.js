import supertest from "supertest";
import application from "../src/application/application";
import { connection } from "../src/db/configs/connection";
describe("API /v1/transaction", () => {
  let X_API_TOKEN;
  let PRODUCT_ID;
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
    const product = await supertest(application)
      .post("/v1/products")
      .set({ "X-API-TOKEN": X_API_TOKEN })
      .send({
        name: "Rinso",
        category: "Sembako",
      });
    PRODUCT_ID = product.body.id;
  });
  it("should can do transaction(buy something)", async () => {
    const response = await supertest(application)
      .post("/v1/transaction")
      .set({ "X-API-TOKEN": X_API_TOKEN })
      .send({ productId: PRODUCT_ID });
    expect(response.body.buyer).toBe("abdillah");
    expect(response.body.product).toBe("Rinso");
    expect(response.body.country).toBe("Indonesian");
    expect(response.body.province).toBe("East java");
    expect(response.body.city).toBe("Surabaya");
    expect(response.body.vilage).toBe("Konoha");
    expect(response.status).toBe(201);
  });
});
