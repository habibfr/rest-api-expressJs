import { Users } from "../db/models/model-syncronization.js";
import AuthenticationTokenException from "../errors/authentication-exception.js";
const authenticationMiddleware = async (request, response, nextFunction) => {
  try {
    const token = request.get("X-API-TOKEN");
    if (!token) {
      response.status(401).json({ message: "Token error" });
      throw new AuthenticationTokenException("Token error", 401);
    }
    const user = await Users.findOne({
      where: { token },
    });
    if (!user) {
      response.status(401).json({ message: "Token error" });
      throw new AuthenticationTokenException("Token error", 401);
    }
    request.user = user.toJSON();
    nextFunction();
    return;
  } catch (error) {
    console.log(error);
  }
};
export { authenticationMiddleware };
