import type { Status } from "./status";

export type ErrorResponse = {
  status: Status;
  message: string;
};
