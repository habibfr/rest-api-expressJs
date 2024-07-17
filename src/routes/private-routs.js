import express from "express";
import UserController from "../controllers/user-controller.js";
import { authenticationMiddleware } from "../middlewares/authentication-middleware.js";
const privateRouts = express.Router();
/**
 * Pada routes ini akan menyimpan semua endpoin yang bersifat private
 * artinya jiialau mau akses endpoin ini harus melakukan authentikasi terlebih dahulu(Login/Register)
 */
privateRouts.use(authenticationMiddleware);
privateRouts.post("/v1/addresses", UserController.createAddress);
privateRouts.post("/v1/products", UserController.createProduct);
privateRouts.post("/v1/transaction", UserController.transaction);
privateRouts.get("/v1/transactions", UserController.findAllTransaction);
privateRouts.get("/v1/user", UserController.findUser);
privateRouts.get("/v1/users", UserController.getAllUsers);
export { privateRouts };
