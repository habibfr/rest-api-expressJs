/**
 * @class AuthenticationTokenException
 * AuthenticationTokenException ini digunakan unutuk exception dengan jenis galat token authentikasi
 */
export default class AuthenticationTokenException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
