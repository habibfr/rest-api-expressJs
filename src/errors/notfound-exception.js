/**
 * @class NotFoundException
 * 
 * NotFoundException ini digunakan untuk exception dengan tipe galat menemukan data
 */
export default class NotFoundException extends Error{
    constructor(message, statusCode){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}