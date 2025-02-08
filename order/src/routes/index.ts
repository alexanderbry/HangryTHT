import { Router } from "express";
import authentication from "./middlewares/authentication";
import errorHandler from "./middlewares/errorHandler";
const router = Router();

router.use(authentication);


router.use(errorHandler);

export default router;
