import Transaction from "../infra/typeorm/entities/Transaction";

import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import IGetTransactionsInMonthDTO from "../dtos/IGetTransactionsInMonthDTO";
import IGetValuesByMonthDTO from "../dtos/IGetValuesByMonthDTO";

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  createMany(data: ICreateTransactionDTO[]): Promise<Transaction[]>;
  update(transaction: Transaction): Promise<Transaction>;
  delete(transactionId: string, userId: string): Promise<void>;
  getTransaction(
    transactionId: string,
    userId: string
  ): Promise<Transaction | undefined>;
  getTransactionsInMonth(
    data: IGetTransactionsInMonthDTO
  ): Promise<Transaction[]>;
  getAllTransactions(
    description: string | undefined,
    user_id: string
  ): Promise<Transaction[]>;
}
