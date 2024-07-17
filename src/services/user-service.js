import { connection } from "../db/configs/connection.js";
import { Address, Users } from "../db/models/model-syncronization.js";
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
        console.log("email user createAddress : " + user.email);

        // check is user exist
        const isUserExist = await getUserByEmail(user.email);
        // if user does not exist then will throw exception
        if (!isUserExist) {
          throw new EmailOrPasswordException("Please login", 401);
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
      } catch (error) {
        console.log(error);
      }
    });
    return result.toJSON();
  }

  static async findUser(user) {
    try {
      console.log("email user findUser : " + user.email);
      // check if user exists
      const userDetails = await getUserByEmail(user.email);
      // if user does not exist then will throw exception
      if (!userDetails) {
        throw new EmailOrPasswordException("User not found", 404);
      }
      // return user details (you might want to exclude sensitive information)
      return userDetails.toJSON();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getAllUsers() {
    try {
      // Asumsikan Anda memiliki model User yang sudah didefinisikan
      const users = await Users.findAll({
        attributes: [
          "id",
          "email",
          "firstName",
          "lastName",
          "createdAt",
          "updatedAt",
        ],
        // Exclude password dan informasi sensitif lainnya
        order: [["createdAt", "DESC"]], // Urutkan berdasarkan waktu pembuatan terbaru
      });

      // Jika Anda ingin melakukan pemetaan atau transformasi data
      // console.log(users);
      return users.map((user) => user.toJSON());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
