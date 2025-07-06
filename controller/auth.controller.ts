import { loginUser, registerUser } from "../service/auth.service";
import Router from "express-promise-router";
import { CONSTANT_MESSAGE } from "../common/constant";
import { signUpSchema } from "../validations/auth.validator";
const router = Router();

router.post("/signUp", async (req, res) => {
  try {
    await signUpSchema.validateAsync(req.body);
    const userDetails = await registerUser(req.body);
    return res.status(userDetails?.statusCode || 200).send(userDetails);
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("[ERROR] in setting up the user");
    return res
      .status(400)
      .send({
        statusCode: 400,
        status: CONSTANT_MESSAGE.STATUS.ERROR,
        message: error.message,
      });
  }
});

router.post("/login", async (req, res) => {
  try {
    await signUpSchema.validateAsync(req.body);
    const userLogin = await loginUser(req.body);
    return res.status(userLogin?.statusCode || 200).send(userLogin);
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("[ERROR] while user login");
    return res
      .status(400)
      .send({
        statusCode: 400,
        status: CONSTANT_MESSAGE.STATUS.ERROR,
        message: error.message,
      });
  }
});



export default router;
