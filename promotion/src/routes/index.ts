import { Router } from "express";
import errorHandler from "./middlewares/errorHandler";
import PromotionController from "../controllers/promotionController";
const router = Router();

router.get("/", PromotionController.getApplicablePromotion);
router.post("/create", PromotionController.createPromotion);

router.use(errorHandler);

export default router;