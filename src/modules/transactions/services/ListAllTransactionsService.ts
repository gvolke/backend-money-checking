import { injectable, inject } from "tsyringe";

import Transaction from "../infra/typeorm/entities/Transaction";
import ITransactionsRepository from "../repositories/ITransactionsRepository";

interface IRequest {
  description: string | undefined;
  user_id: string;
}

type IResponse = Array<{
  transaction: Transaction;
  balance: number;
}>;

@injectable()
class GetTransactionService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository
  ) {}

  public async execute({ description, user_id }: IRequest): Promise<IResponse> {
    let transactions = await this.transactionsRepository.getAllTransactions(
      description,
      user_id
    );

    let balance = 0;

    transactions = transactions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;

      return 0;
    });

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

export default GetTransactionService;
