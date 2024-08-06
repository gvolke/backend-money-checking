import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import TransactionsController from "../controllers/TransactionsController";

const transactionsRouter = Router();

const transactionsController = new TransactionsController();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid(),
      date: Joi.date().required(),
      description: Joi.string().required(),
      observation: Joi.string().allow(""),
      type: Joi.string().required(),
      value: Joi.number().required(),
      category: Joi.string().required(),
    },
  }),
  transactionsController.create
);

transactionsRouter.get(
  "/:transactionId",
  celebrate({
    [Segments.PARAMS]: {
      transactionId: Joi.string().uuid().required(),
    },
  }),
  transactionsController.read
);

transactionsRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      date: Joi.date(),
      description: Joi.string(),
      observation: Joi.string().allow(""),
      type: Joi.string(),
      value: Joi.number(),
      category: Joi.string(),
    },
  }),
  transactionsController.update
);

transactionsRouter.delete(
  "/:transactionId",
  celebrate({
    [Segments.PARAMS]: {
      transactionId: Joi.string().uuid().required(),
    },
  }),
  transactionsController.delete
);

export default transactionsRouter;
