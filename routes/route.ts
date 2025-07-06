import Router from "express-promise-router";
import authRouter from "../controller/auth.controller";
import userRouter from "../controller/user.controller"
import userAuthentication from "../middleware/validate";
const router = Router();

router.use("/auth", authRouter);
router.use("/user", userAuthentication, userRouter);

export default router;
