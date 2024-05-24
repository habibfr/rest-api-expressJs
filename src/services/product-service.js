import { connection } from "../db/configs/connection.js";
import Product from "../db/models/product-model.js";
import ProductValidator from "../validations/product-validator.js";
import ZodValidator from "../validations/validator.js";
/**
 * Product service akan memuat proses manipulasi-manipulasi data product
 */
export default class ProductService {
  /**
   * metod create digunakan untuk membat atau memasukan data address
   * 
   * 
   * @param { Object } createProductReq object request body yang memuat data-data dari address
   * @returns Promise<address> 
   */
  static async create(createProductReq) {
    // validasi request
    const createProductValidReq = ZodValidator.validate(
      ProductValidator.CREATE,
      createProductReq
    );
    return await connection.transaction(async (tr) => {
      return (await Product.create({ ...createProductValidReq }, { transaction: tr })).toJSON();
    });
  }
}
