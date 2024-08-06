import { Request, Response } from "express";
import { container } from "tsyringe";

import listAllTransactionsService from "@modules/transactions/services/ListAllTransactionsService";

export default class TransactionsMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { description } = request.query;

    const descriptionStr = Array.isArray(description)
      ? description[0]
      : description;

    const listAllTransactions = container.resolve(listAllTransactionsService);

    const transactionsMonth = await listAllTransactions.execute({
      description: descriptionStr ? String(descriptionStr) : undefined,
      user_id,
    });

    return response.json(transactionsMonth);
  }
}
