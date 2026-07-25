import { Response } from "express";

export const success = (
  res: Response,
  data: unknown,
  message = "Success",
  status = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const failure = (
  res: Response,
  message = "Something went wrong",
  status = 500
) => {
  return res.status(status).json({
    success: false,
    error: {
      message,
    },
  });
};