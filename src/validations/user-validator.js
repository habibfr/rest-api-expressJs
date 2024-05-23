import { z } from "zod";

export default class Uservalidartor {
  static REGISTER = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100).optional(),
    email: z.string().min(3).max(100).email(),
    password: z.string().min(5).max(255),
  });
  static LOGIN = z.object({
    email: z.string().email().min(3).max(50),
    password: z.string().min(5).max(255),
  });
  static REGISTER_USER_ADDRESS = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100).optional(),
    email: z.string().min(3).max(100).email(),
    password: z.string().min(5).max(255),
    Address: z.object({
      country: z.string().min(3).max(100),
      province: z.string().min(3).max(100).optional(),
      city: z.string().min(3).max(100).optional(),
      vilage: z.string().min(3).max(100).optional(),
    }),
  });
}
