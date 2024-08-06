import { Request, Response } from "express";
import { container } from "tsyringe";

import GetValuesByMonthService from "@modules/transactions/services/GetValuesByMonthService";

export default class TransactionsGroupedByMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listTransactionsGroupedByMonth = container.resolve(
      GetValuesByMonthService
    );

    const transactionsMonth = await listTransactionsGroupedByMonth.execute({
      user_id,
    });

    return response.json(transactionsMonth);
  }
}
