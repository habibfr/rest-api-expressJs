import { connection } from "../db/configs/connection.js";
import Address from "../db/models/address-model.js";
import Product from "../db/models/product-model.js";
import Transaction from "../db/models/transaction-model.js";
import NotFoundException from "../errors/notfound-exception.js";
import TransactionValidator from "../validations/transaction-validation.js";
import ZodValidator from "../validations/validator.js";
export default class TransactionService {
  /**
   *
   * @param { Object } user object user
   * @param { Object } transactionRequest object request body yang memuat data-data dari transaksi
   * @returns Promise<Object> 
   */
  static async create(user, transactionRequest) {
    //validasi request
    const transactionReqValid = ZodValidator.validate(
      TransactionValidator.BUY,
      transactionRequest
    );
    // melakukan transaksi dengan managed transaction by sequelize
    const result = await connection.transaction(async (tr) => {
      // mengambil user berdasarkan id
      const address = await Address.findOne(
        {
          where: {
            UserId: user.id,
          },
          attributes: ["country", "province", "city", "vilage"],
        },
        { transaction: tr }
      );
      // mengambil product berdasarkan id product
      const productName = await Product.findOne({
        where: {
          id: transactionReqValid.productId,
        },
        attributes: ["name"],
      });

      // jika hasil query product berdasarkan id tidak ditemukan maka akan throw exception
      if (!productName) {
        throw new NotFoundException("product not found", 404);
      }
      // jika user belum memiliki address maka akan throw exception
      if (!address) {
        throw new NotFoundException(
          "please commpletly your address first",
          404
        );
      }
      // melakukan proses transaksi dengan memasukan data ransaksi ke database
      return await Transaction.create(
        {
          buyer: user.firstName,
          product: productName.toJSON().name,
          country: address.toJSON().country,
          province: address.toJSON().province,
          city: address.toJSON().city,
          vilage: address.toJSON().vilage,
        },
        { transaction: tr }
      );
    });
    return result.toJSON();
  }
  /**
   * method unutk mengambil semua data transaksi
   * 
   * @returns Promise<Object>
   */
  static async findAllTransaction() {
    return await connection.transaction(async (tr) => {
      return await Transaction.findAll({}, { transaction: tr });
    });
  }
}
