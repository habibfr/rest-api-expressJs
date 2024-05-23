import { connection } from "../db/configs/connection.js";
import Address from "../db/models/address-model.js";
import Product from "../db/models/product-model.js";
import Transaction from "../db/models/transaction-model.js";
import NotFoundException from "../errors/notfound-exception.js";
import TransactionValidator from "../validations/transaction-validation.js";
import ZodValidator from "../validations/validator.js";
export default class TransactionService {
  static async create(user, transactionRequest) {
    const transactionReqValid = ZodValidator.validate(
      TransactionValidator.BUY,
      transactionRequest
    );
    const result = await connection.transaction(async (tr) => {
      const address = await Address.findOne(
        {
          where: {
            UserId: user.id,
          },
          attributes: ["country", "province", "city", "vilage"],
        },
        { transaction: tr }
      );
      const productName = await Product.findOne({
        where: {
          id: transactionReqValid.productId,
        },
        attributes: ["name"],
      });
      // before create transaction please check the first is the address null or not
      // to handle or avoid blank response
      if (!productName) {
        throw new NotFoundException("product not found", 404);
      }
      if (!address) {
        throw new NotFoundException(
          "please commpletly your address first",
          404
        );
      }
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
  static async findAllTransaction(user) {
    return await connection.transaction(async (tr) => {
      return await Transaction.findAll({}, {transaction: tr});
    });
  }
}
