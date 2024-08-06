import { Request, Response } from "express";
import { container } from "tsyringe";

import ListTransactionsMonthService from "@modules/transactions/services/ListTransactionsMonthService";

export default class TransactionsMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { month, year } = request.query;

    const listTransactionsMonth = container.resolve(
      ListTransactionsMonthService
    );

    const transactionsMonth = await listTransactionsMonth.execute({
      user_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(transactionsMonth);
  }
}
