import { Router } from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
const router = Router();

dotenv.config();

const userApp = process.env.USER_APP || "http://localhost:3000";
const promotionApp = process.env.PROMOTION_APP || "http://localhost:3001";
const orderApp = process.env.ORDER_APP || "http://localhost:3002";

router.all("/:appName", async (req: Request, res: Response): Promise<any> => {
  const app = req.params.appName;
  const path = req.originalUrl;

  let targetUrl = "";

  switch (app) {
    case "user":
      targetUrl = `${userApp}${path}`;
      break;
    case "order":
      targetUrl = `${orderApp}${path}`;
      break;
    case "promotion":
      targetUrl = `${promotionApp}${path}`;
      break;
    default:
      return res.status(404).json({ message: "Service not found" });
  }
  console.log(`Redirecting to ${targetUrl}`);
  

  return res.redirect(targetUrl);
});

export default router;
