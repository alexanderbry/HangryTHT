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
    case "FailedCreateCart":
      status = 400;
      message = "Failed to create cart";
      break;
    case "Product not found":
      status = 400;
      message = "There is a product that not existed";
      break;
    case "NoPromotion":
      status = 400;
      message = "No promotion available";
      break;
    case "Cart not found":
      status = 400;
      message = "Cart not found";
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