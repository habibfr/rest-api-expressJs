import { ZodError } from "zod";
import EmailOrPasswordException from "../errors/email-or-password-exception.js";
import AuthenticationTokenException from "../errors/authentication-exception.js";
import NotFoundException from "../errors/notfound-exception.js";
const errorMiddleware = (error, request, response, nextFunction) => {
  if (error instanceof ZodError) {
    response.status(400).json({ message: [...error.errors] });
  } else if (error instanceof EmailOrPasswordException) {
    response.status(error.statusCode).json({ message: error.message });
  } else if (error instanceof AuthenticationTokenException) {
    console.log("TRIGEREDDDD");
    response.status(error.statusCode).json({ message: error.message });
  } else if (error instanceof NotFoundException) {
    response.status(error.statusCode).json({ message: error.message });
  } else {
    response.status(500).status(error.message);
  }
};
export { errorMiddleware };
