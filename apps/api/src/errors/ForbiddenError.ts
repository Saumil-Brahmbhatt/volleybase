import { ApiError } from "./ApiError";

export class ForbiddenError extends ApiError {
  constructor() {
    super(403, "Forbidden.");
  }
}