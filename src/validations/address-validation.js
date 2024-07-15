import { z } from "zod";

export default class AddressValidator {
  static CREATE = z.object({
    country: z.string().min(3).max(100),
    province: z.string().min(3).max(100).optional(),
    city: z.string().min(3).max(100).optional(),
    village: z.string().min(3).max(100).optional(),
  });
}
