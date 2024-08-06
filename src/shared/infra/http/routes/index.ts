import { Router } from "express";

import transactionsRouter from "@modules/transactions/infra/http/routes/transactions.route";
import userTransactions from "@modules/transactions/infra/http/routes/usertransactions.route";
import usersRouter from "@modules/users/infra/http/routes/users.route";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.route";
import passwordRouter from "@modules/users/infra/http/routes/password.route";
import profileRouter from "@modules/users/infra/http/routes/profile.route";

const routes = Router();
routes.use("/transactions", transactionsRouter);
routes.use("/usertransactions", userTransactions);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);

export default routes;
