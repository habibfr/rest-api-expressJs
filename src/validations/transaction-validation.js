import { z } from "zod";

export default class TransactionValidator {
  static BUY = z.object({
    productId: z.number().positive(),
  });
}
