import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  let data = null;

  switch (err.name) {
    case "TokenExpiredError":
    case "JsonWebTokenError":
      status = 401;
      message = "Please login first";
      break;
    case "NameTaken":
      status = 401;
      message = "Name already exists";
      break;
    case "Not Found":
      status = 404;
      message = "Data not found";
      break;
    case "Unauthorized":
      status = 401;
      message = "Please login first";
      break;
    default:
      console.error(err);
      break;
  }
  res.status(status).json({ status, message, data });
};

export default errorHandler;