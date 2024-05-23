import supertest from "supertest";
import application from "../src/application/application.js";
import Users from "../src/db/models/user-model.js";
describe("API /v1/auth", () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
  });
  it("should can be register", async () => {
    const response = await supertest(application).post("/v1/auth").send({
      firstName: "Audia",
      lastName: "Naila Safa",
      email: "audiaalli@gmail.com",
      password: "randomPass",
    });
    console.log(response.body);
    expect(response.body.message).toBe("successfully register");
    expect(response.status).toBe(201);
  });
  it("should be rejected when register with same email", async () => {
    await supertest(application).post("/v1/auth").send({
      firstName: "Audia",
      lastName: "Naila Safa",
      email: "audiaalli@gmail.com",
      password: "randomPass",
    });
    const response = await supertest(application).post("/v1/auth").send({
      firstName: "Audia",
      lastName: "Naila Safa",
      email: "audiaalli@gmail.com",
      password: "randomPass",
    });
    expect(response.body.message).toBe(
      "email with audiaalli@gmail.com alredy use, please use another email"
    );
    expect(response.status).toBe(400);
  });
  it("shoud be reject when register request does not valid", async () => {
    const response = await supertest(application).post("/v1/auth").send({
      firstName: 23343,
      lastName: "Na",
      email: "audiaal",
      password: 85794,
    });
    expect(response.body.message).toBeDefined();
    expect(response.status).toBe(400);
  });
  it("should can register and insert address directly", async () => {
    const response = await supertest(application)
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
    expect(response.body.message).toBe("Successfully register");
    expect(response.status).toBe(201);
  });
  it("should be reject when request does not valid", async () => {
    const response = await supertest(application)
      .post("/v1/auth-and-create-address")
      .send({
        firstName: 123532,
        lastName: "Alli",
        email: "another",
        password: "secreet-pass",
        Address: {
          country: 1231542,
          province: "East java",
          city: "s",
          vilage: "co",
        },
      });
    expect(response.body.message).toBeDefined();
    expect(response.status).toBe(400);
  });
  it("should can login", async () => {
    await supertest(application).post("/v1/auth").send({
      firstName: "Audia",
      lastName: "Naila Safa",
      email: "audiaalli@gmail.com",
      password: "randomPass",
    });
    const response = await supertest(application).post("/v1/auth/login").send({
      email: "audiaalli@gmail.com",
      password: "randomPass",
    });
    expect(response.body.message).toBe("successfully login");
    expect(response.body.token).toBeDefined();
    expect(response.status).toBe(200);
  });
  it("should be reject when reques does not valid", async () => {
    await supertest(application).post("/v1/auth").send({
      firstName: "Audia",
      lastName: "Naila Safa",
      email: "audiaalli@gmail.com",
      password: "randomPass",
    });
    const response = await supertest(application).post("/v1/auth/login").send({
      email: "audiaalli",
      password: 123141341,
    });
    expect(response.body.message).toBeDefined();
    expect(response.status).toBe(400);
  });
  it("should be reject when username or password is wrong", async () => {
    await supertest(application).post("/v1/auth").send({
      firstName: "Audia",
      lastName: "Naila Safa",
      email: "audiaalli@gmail.com",
      password: "randomPass",
    });
    const response = await supertest(application).post("/v1/auth/login").send({
      email: "audiaalli@gmail.com",
      password: "wrong_password",
    });
    expect(response.body.message).toBe("email or password wrong");
    expect(response.status).toBe(400);
  });
});
