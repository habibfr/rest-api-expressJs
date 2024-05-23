import express from "express";
import UserController from "../controllers/user-controller.js";
import { authenticationMiddleware } from "../middlewares/authentication-middleware.js";
const privateRouts = express.Router();
privateRouts.use(authenticationMiddleware);
privateRouts.post("/v1/addresses", UserController.createAddress);
privateRouts.post("/v1/products", UserController.createProduct);
privateRouts.post("/v1/transaction", UserController.transaction);
privateRouts.get("/v1/transaction", UserController.findAllTransaction);
export { privateRouts };