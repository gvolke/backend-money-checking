import { format } from "date-fns";
import { injectable, inject } from "tsyringe";

import Transaction from "../infra/typeorm/entities/Transaction";
import ITransactionsRepository from "../repositories/ITransactionsRepository";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

import AppError from "@shared/errors/AppError";

interface IRequest {
  date: Date | null;
  description: string;
  observation: string;
  type: string;
  user_id: string;
  value: number;
  category: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    date,
    description,
    observation,
    type,
    user_id,
    value,
    category,
  }: IRequest): Promise<Transaction> {
    if (!date) {
      throw new AppError("The transaction must have a date");
    }

    if (type === "") {
      throw new AppError("The transaction must have a type");
    }

    if (description === "") {
      throw new AppError("The transaction must have a description");
    }

    if (category === "") {
      throw new AppError("The transaction must have a category");
    }

    if (value === 0 || value < 0) {
      throw new AppError("The transaction must have a valid value");
    }

    const transaction = await this.transactionsRepository.create({
      date,
      description,
      observation,
      type,
      user_id,
      value,
      category,
    });

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: "Novo lançamento registrado",
    });

    await this.cacheProvider.invalidate(
      `user-transactions:${user_id}:${format(date, "yyyy-M-d")}`
    );

    return transaction;
  }
}

export default CreateTransactionService;
