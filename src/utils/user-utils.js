import { Op } from "sequelize";
import { connection } from "../db/configs/connection.js";
import Users from "../db/models/user-model.js";
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
const checkPassword = async (password, email) => {
  return await connection.transaction(async (tr) => {
    const user = await Users.findOne({
      where: {
        [Op.and]: [
          {
            email: email,
            password: password,
          },
        ],
      },
    });
    if (user) return true;
    else return false;
  });
};
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
