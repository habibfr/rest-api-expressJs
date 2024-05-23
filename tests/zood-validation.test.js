import { ZodError, z } from "zod";

describe("Zod test validation", () => {
  it("should throw", () => {
    const schema = z.object({
      firstName: z.string().max(3),
      lastName: z.string().max(3),
    });
    expect(() => {
      schema.parse({
        firstName: "912388ye1ndd7",
        lastName: "d8h2hdhu[97g32",
      });
    }).toThrow(ZodError);
  });
});
