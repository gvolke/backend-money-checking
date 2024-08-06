import { uuid } from "uuidv4";
import { getMonth, getYear } from "date-fns";

import ITransactionsRepository from "../ITransactionsRepository";
import ICreateTransactionDTO from "@modules/transactions/dtos/ICreateTransactionDTO";
import Transaction from "@modules/transactions/infra/typeorm/entities/Transaction";
import IGetTransactionsInMonthDTO from "@modules/transactions/dtos/IGetTransactionsInMonthDTO";

class NotificationsRepository implements ITransactionsRepository {
  private transactions: Transaction[] = [];

  public async create({
    date,
    description,
    observation,
    type,
    user_id,
    value,
    category,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();

    Object.assign(transaction, {
      id: uuid(),
      date,
      description,
      observation,
      type,
      user_id,
      value,
      category,
    });

    this.transactions.push(transaction);

    return transaction;
  }

  public async update(transaction: Transaction): Promise<Transaction> {
    const index = this.transactions.findIndex(
      (updateTransaction) => (updateTransaction.id = transaction.id)
    );

    this.transactions[index] = transaction;

    return transaction;
  }

  public async delete(transactionId: string): Promise<void> {
    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === transactionId
    );

    if (transactionIndex < 0) {
      return;
    }

    this.transactions.splice(transactionIndex, 1);
  }

  public async getTransaction(
    transactionId: string,
    userId: string
  ): Promise<Transaction | undefined> {
    const transaction = this.transactions.find(
      (transaction) =>
        transaction.id === transactionId && transaction.user_id === userId
    );

    return transaction;
  }

  public async getTransactionsInMonth({
    user_id,
    month,
    year,
  }: IGetTransactionsInMonthDTO): Promise<Transaction[]> {
    const transactions = this.transactions.filter(
      (transaction) =>
        transaction.user_id === user_id &&
        getMonth(transaction.date) === month &&
        getYear(transaction.date) === year
    );

    return transactions;
  }

  public async getAllTransactions(
    description: string | undefined,
    user_id: string
  ): Promise<Transaction[]> {
    let transactions = this.transactions;

    if (description) {
      if (description.length > 0) {
        transactions = this.transactions.filter((transaction) => {
          return (
            transaction.description.includes(description) &&
            transaction.user_id === user_id
          );
        });
      }
    }

    return transactions;
  }
}

export default NotificationsRepository;
