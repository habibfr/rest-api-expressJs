import { connection } from "../db/configs/connection.js";
import { Address } from "../db/models/model-syncronization.js";
import EmailOrPasswordException from "../errors/email-or-password-exception.js";
import { getUserByEmail } from "../utils/user-utils.js";
import AddressValidator from "../validations/address-validation.js";
import ZodValidator from "../validations/validator.js";

export default class UserService {
  /**
   * method create address merupakan method yang digunakan untuk membuat data address berdasarkan
   * 
   * @param { Object } user data user
   * @param { Object } createAddressReq sebuah object request body yang mmeuat data-data yang dibutuhkan untuk memuad address
   * @returns Pomise<Object>
   */
  static async createAddress(user, createAddressReq) {
    // validate request
    const createAddressValidReq = ZodValidator.validate(
      AddressValidator.CREATE,
      createAddressReq
    );
    // begin transaction
    const result = await connection.transaction(async (tr) => {
      try {
        // check is user exist
        const isUserExist = await getUserByEmail(user.email);
        // if user does not exist then will throw exception
        if (!isUserExist) {
          throw new EmailOrPasswordException("Pleas login", 401);
        }
        // create new address
        return await Address.create(
          {
            ...createAddressValidReq,
            UserId: isUserExist.toJSON().id,
          },
          {
            transaction: tr,
            include: [
              {
                association: Address.Users,
              },
            ],
          }
        );
      } catch (error) {}
    });
    return result.toJSON();
  }
}
