import { z } from "zod";
import { api as bfvApi, schemas as bfvSchemas } from "./client";

export { bfvApi, bfvSchemas };

export type Schemas = {
  [Key in keyof typeof bfvSchemas]: z.infer<(typeof bfvSchemas)[Key]>;
};
