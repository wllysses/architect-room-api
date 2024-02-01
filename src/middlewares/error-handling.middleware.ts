import { NextFunction, Request, Response } from "express";

export class ErrorHandlingMiddleware {
  public handler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}
