/**
 * @class EmailOrPasswordException
 * 
 * EmailOrPasswordException ini digunakan untuk exception dengan tipe galat Authentikasi email dan password
 */
export default class EmailOrPasswordException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
