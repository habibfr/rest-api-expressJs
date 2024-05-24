import { connection } from "../db/configs/connection.js";
import { Users } from "../db/models/model-syncronization.js";
import EmailOrPasswordException from "../errors/email-or-password-exception.js";
import {
  checkPassword,
  countUser,
  getUserByEmail,
} from "../utils/user-utils.js";
import Uservalidartor from "../validations/user-validator.js";
import ZodValidator from "../validations/validator.js";
import { v4 as uuidV4 } from "uuid";
import "dotenv/config";
import bcrypt from "bcrypt";
export default class AuthenticationService {
  /**
   * method register digunakanuntuk registrasi
   *
   * @param { Object } userRegisterRequest object dari request body yang berisi data-data untuk mellakukan reqistrasi
   * @returns Promise<Object>
   */
  static async register(userRegisterRequest) {
    // validate user
    const userLoginRequestValid = ZodValidator.validate(
      Uservalidartor.REGISTER,
      userRegisterRequest
    );
    // menghitung banyak user dengan dengan email yang tersebut
    const totalUsersame = await countUser(userLoginRequestValid.email);
    if (totalUsersame !== 0) {
      throw new EmailOrPasswordException(
        `email with ${userLoginRequestValid.email} alredy use, please use another email`,
        401
      );
    }
    await connection.transaction(async (tr) => {
      // hashing password
      userLoginRequestValid.password = await bcrypt.hash(
        userLoginRequestValid.password,
        10
      );
      // menyimpan user valid di database
      await Users.create({ ...userLoginRequestValid }, { transaction: tr });
    });
    return {
      message: "successfully register",
    };
  }
  /**
   * method untuk melakukan pengecekan apakah user dan password
   * match dengan user yang ada didalam database atau tidak jiakalu
   * tidak maka akan throw EmailOrPasswordException
   *
   * @param {Object} userLoginRequest object dari request body yang berisi data-data yang digunakan untuk melakukan logn
   * @returns Promise
   *
   */
  static async login(userLoginRequest) {
    // validasi request
    const userLoginValidReq = ZodValidator.validate(
      Uservalidartor.LOGIN,
      userLoginRequest
    );
    // menghitung jumlah user
    const isUserExist = await countUser(userLoginRequest.email);
    // jika user dengan email tersebut tidak samadengan 1 maka akan melakukan throw EmailOrPasswordException
    if (isUserExist != 1) {
      throw new EmailOrPasswordException("email or password wrong", 401);
    }
    // cek password, apakah match dengan password yang ada didalam database
    const isEmailAndPasswordValid = await checkPassword(
      userLoginRequest.password,
      userLoginRequest.email
    );
    // throw exception jika password nga valid
    if (!isEmailAndPasswordValid) {
      throw new EmailOrPasswordException("email or password wrong", 401);
    }
    const token = uuidV4();
    // melakukan transaksi dengan menggunkan managed transaction by sequelize
    await connection.transaction(async (tr) => {
      const user = await getUserByEmail(userLoginValidReq.email);
      await user.update({ ...user, token: token }, { transaction: tr });
    });
    return {
      message: "successfully login",
      token: token,
    };
  }
  /**
   * method yang digunakan untuk melakukan registrasi
   * sekaligus menambahkan adress dari user yang registrasi
   *
   * @param {Object} userRequest obejct request body yang yang memmuat data user dan data address
   * @returns Promise<Object>
   * 
   */
  static async registerAndCreateAddress(userRequest) {
    // valiasi request
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
      userRequestValid.password = await bcrypt.hash(
        userRequestValid.password,
        10
      );
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
