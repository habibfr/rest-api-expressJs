import { z } from "zod";

export default class ProductValidator {
    static CREATE = z.object({
        name:z.string().min(1).max(100),
        category: z.string().min(4).max(100)
    })
}