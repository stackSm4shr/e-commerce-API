import type { RequestHandler } from "express";

const authorizeAdmin: RequestHandler = (req, _res, next) => {
  if (!req.user?.roles?.includes("admin")) {
    return next(
      new Error("Forbidden: admin access required", {
        cause: { status: 403 },
      })
    );
  }

  next();
};

export default authorizeAdmin;
