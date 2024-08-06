import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateTransactionService from "@modules/transactions/services/CreateTransactionService";
import GetTransactionService from "@modules/transactions/services/GetTransactionService";
import UpdateTransactionService from "@modules/transactions/services/UpdateTransactionService";
import DeleteTransactionService from "@modules/transactions/services/DeleteTransactionService";

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date, description, observation, type, value, category } =
      request.body;
    const user_id = request.user.id;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      date,
      description,
      observation,
      type,
      user_id,
      value,
      category,
    });

    return response.json(transaction);
  }

  public async read(request: Request, response: Response): Promise<Response> {
    const { transactionId } = request.params;
    const userId = request.user.id;

    const getTransaction = container.resolve(GetTransactionService);

    const transaction = await getTransaction.execute({
      transactionId,
      userId,
    });

    return response.json(transaction);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, date, description, observation, type, value } = request.body;
    const userId = request.user.id;

    const updateTransaction = container.resolve(UpdateTransactionService);

    const transaction = await updateTransaction.execute({
      id,
      userId,
      date,
      description,
      observation,
      type,
      value,
    });

    return response.json(transaction);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { transactionId } = request.params;
    const userId = request.user.id;

    const deleteTransaction = container.resolve(DeleteTransactionService);

    deleteTransaction.execute({ transactionId, userId });

    return response.json("Transaction deleted");
  }
}
