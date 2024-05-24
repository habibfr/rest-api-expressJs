import { Users } from "../db/models/model-syncronization.js";
import AuthenticationTokenException from "../errors/authentication-exception.js";
/**
 *
 * fungsi middleware ini digunakan khusus unutuk meng handle
 * proses authentikasi berdasarkan token yang dikirimkan
 * melalui header denga key X-API-TOKEN
 *
 * @param { Request } request Object request milik express unutk melakuakn manipulasi request dsb
 * @param { Response } response Obejct response milik express unutk melakukan manipiulasi response
 * @param { NextFunction } nextFunction Object NextFunctionn milik express untuk melakukan chaining middleware
 * @returns Promise<void>
 */
const authenticationMiddleware = async (request, response, nextFunction) => {
  try {
    // mengambil header dengan key X-API-TOKEN
    const token = request.get("X-API-TOKEN");
    // jika token null/undifined maka akan melakukan throw exception
    if (!token) {
      response.status(401).json({ message: "Token error" });
      throw new AuthenticationTokenException("Token error", 401);
    }
    // jiaka tokennya ada maka akan melakukan query ke tabel user berdasarkan token 
    const user = await Users.findOne({
      where: { token },
    });
    // jika proses query user bedasarkan token itu hasilnya null/undifined maka akan throw exception
    if (!user) {
      response.status(401).json({ message: "Token error" });
      throw new AuthenticationTokenException("Token error", 401);
    }
    // jika hasil query user bedasarkan token nya itu tidak null atau tidak undifined maka
    // object request akan dimodifikasi, akan ditambahkan property user yang mana isinya
    // object user dari hasil query user berdasarkan token
    request.user = user.toJSON();
    // melakukan chaining untik melanjutkan middleware yang lain
    nextFunction();
    return;
  } catch (error) {
    console.log(error);
  }
};
export { authenticationMiddleware };
