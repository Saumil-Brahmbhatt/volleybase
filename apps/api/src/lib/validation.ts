import { AnyZodObject, ZodError } from "zod";
import { RequestHandler } from "express";

import { ValidationError } from "../errors";

export const validate =
  (schema: AnyZodObject): RequestHandler =>
  (req, _res, next) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new ValidationError(error.issues[0].message)
        );
      }

      next(error);
    }
  };