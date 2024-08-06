import { Repository, getRepository, Raw, Like } from "typeorm";

import ITransactionsRepository from "@modules/transactions/repositories/ITransactionsRepository";
import ICreateTransactionDTO from "@modules/transactions/dtos/ICreateTransactionDTO";
import IGetTransactionsInMonthDTO from "@modules/transactions/dtos/IGetTransactionsInMonthDTO";

import Transaction from "../entities/Transaction";

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create({
    date,
    description,
    observation,
    type,
    user_id,
    value,
    category,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      date,
      description,
      observation,
      type,
      user_id,
      value,
      category,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async update(transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(transaction);
  }

  public async delete(transactionId: string, userId: string): Promise<void> {
    await this.ormRepository.delete({ id: transactionId, user_id: userId });
  }

  public async getTransaction(
    transactionId: string,
    userId: string
  ): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne({
      where: { id: transactionId, user_id: userId },
    });

    return transaction;
  }

  public async getTransactionsInMonth({
    user_id,
    month,
    year,
  }: IGetTransactionsInMonthDTO): Promise<Transaction[]> {
    const parsedMonth = String(month).padStart(2, "0");

    const transactions = await this.ormRepository.find({
      where: {
        user_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });

    return transactions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      return 0;
    });
  }

  public async getAllTransactions(
    description: string | undefined,
    user_id: string
  ): Promise<Transaction[]> {
    let transactions = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    if (description) {
      if (description.length > 0) {
        transactions = await this.ormRepository.find({
          where: {
            description: Raw((alias) => `${alias} ILIKE '%${description}%'`),
            user_id,
          },
        });
      }
    }

    return transactions;
  }
}

export default TransactionsRepository;
