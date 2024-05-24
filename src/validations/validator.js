import { ZodObject } from "zod";

export default class ZodValidator {
  /**
   * 
   * @param {ZodObject} schema 
   * @param { Object } dataObject 
   * @returns Object
   * 
   * 
   * Method validate digunakan untuk melakukan validasi, 
   * menerima 2 parameter source dan dataObject. Source adalah object skema validasi dan dataObject adalah data yang akan di validasi
   */
  static validate(schema, dataObject) {
    return schema.parse(dataObject);
  }
}
