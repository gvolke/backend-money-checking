import { format } from "date-fns";
import { injectable, inject } from "tsyringe";

import Transaction from "../infra/typeorm/entities/Transaction";
import ITransactionsRepository from "../repositories/ITransactionsRepository";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

import AppError from "@shared/errors/AppError";

interface IRequest {
  date: Date;
  description: string;
  observation: string;
  type: string;
  user_id: string;
  value: number;
  category: string;
}

@injectable()
class CreateTransactionsService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(
    transactions: IRequest[],
    user_id: string
  ): Promise<Transaction[]> {
    transactions.forEach((transaction) => (transaction.user_id = user_id));

    const createdTransactions = await this.transactionsRepository.createMany(
      transactions
    );

    await this.notificationsRepository.create({
      recipient_id: transactions[0].user_id,
      content: "Novo lançamento registrado",
    });

    for (let i = 0; i < createdTransactions.length; i++) {
      const data = createdTransactions[i].date;

      await this.cacheProvider.invalidate(
        `user-transactions:${createdTransactions[i].user_id}:${format(
          data,
          "yyyy-M-d"
        )}`
      );
    }

    return createdTransactions;
  }
}

export default CreateTransactionsService;
