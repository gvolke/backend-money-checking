import { injectable, inject } from "tsyringe";

import Transaction from "../infra/typeorm/entities/Transaction";
import ITransactionsRepository from "../repositories/ITransactionsRepository";

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  transaction: Transaction;
  balance: number;
}>;

@injectable()
class ListTransactionsMonthService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository
  ) {}

  public async execute({ user_id, month, year }: IRequest): Promise<IResponse> {
    const transactions =
      await this.transactionsRepository.getTransactionsInMonth({
        user_id,
        month,
        year,
      });

    /*let balance = transactions.reduce((sum, transaction) => {
      if (transaction.type === "ENTRADA") {
        return sum + Number(transaction.value);
      } else {
        return sum - Number(transaction.value);
      }
    }, 0);*/

    let balance = 0;

    const transactionsWithBalance = transactions.map((transaction) => {
      if (transaction.type === "SAIDA") {
        balance = balance - Number(transaction.value);
      } else {
        balance = balance + Number(transaction.value);
      }

      return { transaction, balance };
    });

    return transactionsWithBalance.sort((a, b) => {
      const dateA = new Date(a.transaction.date);
      const dateB = new Date(b.transaction.date);

      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;

      return 0;
    });
  }
}

export default ListTransactionsMonthService;
