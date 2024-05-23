import { connection } from "../db/configs/connection.js";
import { Address, Users } from "../db/models/model-syncronization.js";
import EmailOrPasswordException from "../errors/email-or-password-exception.js";
import {
  checkPassword,
  countUser,
  getUserByEmail,
} from "../utils/user-utils.js";
import Uservalidartor from "../validations/user-validator.js";
import ZodValidator from "../validations/validator.js";
import { v4 as uuidV4 } from "uuid";
export default class AuthenticationService {
  static async register(userRegisterRequest) {
    // validate user
    const userLoginRequestValid = ZodValidator.validate(
      Uservalidartor.REGISTER,
      userRegisterRequest
    );
    const totalUsersame = await countUser(userLoginRequestValid.email);
    if (totalUsersame !== 0) {
      throw new EmailOrPasswordException(
        `email with ${userLoginRequestValid.email} alredy use, please use another email`,
        401
      );
    }
    connection.transaction(async (tr) => {
      await Users.create({ ...userLoginRequestValid }, { transaction: tr });
    });
    return {
      message: "successfully register",
    };
  }
  static async login(userLoginRequest) {
    const userLoginValidReq = ZodValidator.validate(
      Uservalidartor.LOGIN,
      userLoginRequest
    );
    const isUserExist = await countUser(userLoginRequest.email);
    if (isUserExist != 1) {
      throw new EmailOrPasswordException("email or password wrong", 401);
    }
    const isEmailAndPasswordValid = await checkPassword(
      userLoginRequest.password,
      userLoginRequest.email
    );
    if (!isEmailAndPasswordValid) {
      throw new EmailOrPasswordException("email or password wrong", 401);
    }
    const token = uuidV4();
    await connection.transaction(async (tr) => {
      const user = await getUserByEmail(userLoginValidReq.email);
      await user.update({ ...user, token: token }, { transaction: tr });
    });
    return {
      message: "successfully login",
      token: token,
    };
  }
  static async registerAndCreateAddress(userRequest) {
    const userRequestValid = ZodValidator.validate(
      Uservalidartor.REGISTER_USER_ADDRESS,
      userRequest
    );
    const isUserExist = await countUser(userRequestValid.email);
    if (isUserExist != 0) {
      throw new EmailOrPasswordException(
        `email with ${userRequestValid.email} alredy use, please use another email`,
        401
      );
    }
    await connection.transaction(async (tr) => {
      await Users.create(
        { ...userRequestValid },
        {
          transaction: tr,
          include: [
            {
              association: Users.address,
            },
          ],
        }
      );
    });
    return {
      message: "Successfully register",
    };
  }
}
