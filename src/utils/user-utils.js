import { connection } from "../db/configs/connection.js";
import Users from "../db/models/user-model.js";
import bcrypt from "bcrypt";
/**
 * fungsi yang digunakan untuk menghitung berapa banyak user dengan email tersebut
 *
 * @param {string} email input email
 * @returns Promise<number>
 */
const countUser = async (email) => {
  return await connection.transaction((tr) => {
    return Users.count(
      {
        where: {
          email: email,
        },
      },
      {
        transaction: tr,
      }
    );
  });
};

/**
 * fungsi yang digunakan untuk melakukan pegecekan password, apakah password valid/match atau tidak dengan 
 * passwod yang ada di database
 * 
 * @param {string} password input password
 * @param {string} email input email
 * @returns Promise<boolean>
 * 
 */
const checkPassword = async (password, email) => {
  return await connection.transaction(async (tr) => {
    const user = await Users.findOne({
      where: { email },
    }, { transaction: tr });
    return await bcrypt.compare(password, user.toJSON().password);
  });
};
/**
 * fungsi yang digunakan untuk megambil satu user berdasarkan email
 * 
 * @param {string} email 
 * @returns  Promise<User>
 * 
 */
const getUserByEmail = async (email) => {
  return await connection.transaction(async (tr) => {
    return await Users.findOne(
      {
        where: {
          email: email,
        },
      },
      { transaction: tr }
    );
  });
};
export { countUser, checkPassword, getUserByEmail };
