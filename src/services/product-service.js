import { connection } from "../db/configs/connection.js";
import Product from "../db/models/product-model.js";
import ProductValidator from "../validations/product-validator.js";
import ZodValidator from "../validations/validator.js";
export default class ProductService {
  static async create(createProductReq) {
    const createProductValidReq = ZodValidator.validate(
      ProductValidator.CREATE,
      createProductReq
    );
    return await connection.transaction(async (tr) => {
      return (await Product.create({ ...createProductValidReq }, { transaction: tr })).toJSON();
    });
  }
}
