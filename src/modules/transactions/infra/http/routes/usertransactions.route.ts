import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import TransactionsMonthController from "../controllers/TransactionsMonthController";
import AllTransactionsController from "../controllers/AllTransactionsController";
import TransactionsGroupedByMonthController from "../controllers/TransactionsGroupedByMonthController";
import TransactionsGroupedByCategoryController from "../controllers/TransactionsGroupedByCategoryController";

const userTransactions = Router();

const transactionsMonthController = new TransactionsMonthController();
const allTransactionsMonthController = new AllTransactionsController();
const transactionsGroupedByMonth = new TransactionsGroupedByMonthController();
const transactionsGroupedByCategory =
  new TransactionsGroupedByCategoryController();

userTransactions.use(ensureAuthenticated);

userTransactions.get("/month", transactionsMonthController.index);
userTransactions.get("/all", allTransactionsMonthController.index);
userTransactions.get("/grouped-month", transactionsGroupedByMonth.index);
userTransactions.get("/grouped-category", transactionsGroupedByCategory.index);

export default userTransactions;
