import { Router } from "express";
import UserController from "../controllers/userController";
import errorHandler from "./middlewares/errorHandler";
const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:id", UserController.getUserById);

router.use(errorHandler);

export default router;
