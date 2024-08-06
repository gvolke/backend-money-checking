import { Request, Response } from "express";
import { container } from "tsyringe";

import GetValuesByCategoryService from "@modules/transactions/services/GetValuesByCategoryService";

export default class TransactionsGroupedByMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listTransactionsGroupedByCategory = container.resolve(
      GetValuesByCategoryService
    );

    const transactionsMonth = await listTransactionsGroupedByCategory.execute({
      user_id,
    });

    return response.json(transactionsMonth);
  }
}
