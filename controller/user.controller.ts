import Router from "express-promise-router";
import { CONSTANT_MESSAGE } from "../common/constant";
import { listUsers } from "../service/user.service";
const router = Router();

router.get("/users", async (req, res) => {
  try {
    const usersList = await listUsers();
    return res.status(usersList?.statusCode || 200).send(usersList);
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

export default router;