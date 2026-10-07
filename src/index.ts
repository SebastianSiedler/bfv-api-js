import type { z } from "zod";
import {
  api as bfvApi,
  schemas as bfvSchemas,
  createApiClient,
} from "./client";

export {
  bfvApi,
  bfvSchemas,
  createApiClient,
  createApiClient as createBfvApiClient,
};

export type Schemas = {
  [Key in keyof typeof bfvSchemas]: z.infer<(typeof bfvSchemas)[Key]>;
};

export type Team = Schemas["Team"];
export type Match = Schemas["Match"];
export type ClubInformation = Schemas["ClubInformation"];
export type TableEntry = Schemas["TableEntry"];
