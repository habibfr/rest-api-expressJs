import AuthenticationService from "../services/authentication-service.js";
import ProductService from "../services/product-service.js";
import TransactionService from "../services/transaction-service.js";
import UserService from "../services/user-service.js";
export default class UserController {
  static async register(request, response, nextFunction) {
    try {
      // console.log(request.body);
      const result = await AuthenticationService.register(request.body);
      response.status(201).json({ ...result });
    } catch (error) {
      // console.log(error);
      nextFunction(error);
    }
  }
  static async registerAndCreateAddress(request, response, nextFunction) {
    try {
      const result = await AuthenticationService.registerAndCreateAddress(
        request.body
      );
      response.status(201).json({ ...result });
    } catch (error) {
      nextFunction(error);
    }
  }
  static async login(request, response, nextFunction) {
    try {
      const result = await AuthenticationService.login(request.body);
      response.status(200).json({ ...result });
    } catch (error) {
      nextFunction(error);
    }
  }
  static async createProduct(request, response, nextFunction) {
    try {
      const result = await ProductService.create(request.body);
      response.status(201).json({ ...result });
    } catch (error) {
      nextFunction(error);
    }
  }
  static async createAddress(request, response, nextFunction) {
    try {
      const result = await UserService.createAddress(
        request.user,
        request.body
      );
      response.status(201).json({ ...result });
    } catch (error) {
      console.log(error);
      nextFunction(error);
    }
  }
  static async transaction(requst, response, nextFuction) {
    try {
      const result = await TransactionService.create(requst.user, requst.body);
      response.status(201).json({ ...result });
    } catch (error) {
      nextFuction(error);
    }
  }
  static async findAllTransaction(request, response, nextFunction) {
    try {
      const result = await TransactionService.findAllTransaction(request.user);
      response.status(200).json([...result]);
    } catch (error) {
      console.log(error);
      nextFunction(error);
    }
  }
}
