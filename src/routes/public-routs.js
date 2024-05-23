import UserController from "../controllers/user-controller.js";
import express from "express";
const publicRouts = express.Router();
publicRouts.post("/v1/auth", UserController.register);
publicRouts.post("/v1/auth-and-create-address", UserController.registerAndCreateAddress)
publicRouts.post("/v1/auth/login", UserController.login);
export { publicRouts };
