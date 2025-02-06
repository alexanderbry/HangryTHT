import { Router } from "express";
import UserController from "../controllers/userController";
import errorHandler from "./middlewares/errorHandler";
const router = Router();

router.post("/register", UserController.register);

router.use(errorHandler);

export default router;
