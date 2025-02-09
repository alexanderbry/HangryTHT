import { Router } from "express";
import authentication from "./middlewares/authentication";
import errorHandler from "./middlewares/errorHandler";
import OrderController from "../controllers/orderController";
const router = Router();

router.use(authentication);

router.post("/add-to-cart", OrderController.addToCart);

router.use(errorHandler);

export default router;
