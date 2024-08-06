import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ProfileController from "../controllers/ProfileController";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const profileRouter = Router();
const profileControler = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get("/", profileControler.show);
profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref("password")),
    },
  }),
  profileControler.update
);

export default profileRouter;
