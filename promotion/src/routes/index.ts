import { Router } from "express";
import errorHandler from "./middlewares/errorHandler";
import PromotionController from "../controllers/promotionController";
import authentication from "./middlewares/authentication";
const router = Router();

router.use(authentication)

router.get("/user-promotion", PromotionController.getApplicablePromotion);
router.post("/create", PromotionController.createPromotion);

router.use(errorHandler);

export default router;
