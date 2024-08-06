import { injectable, inject } from "tsyringe";

import Transaction from "../infra/typeorm/entities/Transaction";
import ITransactionsRepository from "../repositories/ITransactionsRepository";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  userId: string;
  date: Date;
  description: string;
  observation: string;
  type: string;
  value: number;
}

@injectable()
class UpdateTransactionService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({
    id,
    userId,
    date,
    description,
    observation,
    type,
    value,
  }: IRequest): Promise<Transaction> {
    const transaction = await this.transactionsRepository.getTransaction(
      id,
      userId
    );

    if (!transaction) {
      throw new AppError("Transaction not found");
    }

    if (value === 0) {
      throw new AppError("Value can't be 0");
    }

    if (value < 0) {
      throw new AppError("Value can't be lower than 0");
    }

    const updatedTransaction = {
      ...transaction,
      date,
      description,
      observation,
      type,
      value,
    };

    await this.notificationsRepository.create({
      recipient_id: userId,
      content: "Lançamento alterado com sucesso",
    });

    return this.transactionsRepository.update(updatedTransaction);
  }
}

export default UpdateTransactionService;
