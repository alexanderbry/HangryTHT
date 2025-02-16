import { Router } from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";

const router = Router();

dotenv.config();

const userApp = process.env.USER_APP || "http://localhost:3000";
const promotionApp = process.env.PROMOTION_APP || "http://localhost:3001";
const orderApp = process.env.ORDER_APP || "http://localhost:3002";

router.all(
  "/:appName/*",
  async (req: Request, res: Response): Promise<void> => {
    const app = req.params.appName;
    const path = req.originalUrl;

    let headers: Record<string, string> = {};
    if (req.headers.authorization) {
      headers["Authorization"] = req.headers.authorization as string;
      headers["Content-Type"] = "application/json";
    } else {
      headers["Content-Type"] = "application/json";
    }
    
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
        res.status(404).json({ message: "Service not found" });
    }

    try {
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: headers,
        body: req.method === "GET" ? undefined : JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Error making request to target service:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
