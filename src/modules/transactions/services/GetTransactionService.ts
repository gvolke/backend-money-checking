import { injectable, inject } from "tsyringe";

import Transaction from "../infra/typeorm/entities/Transaction";
import ITransactionsRepository from "../repositories/ITransactionsRepository";

interface IRequest {
  transactionId: string;
  userId: string;
}

@injectable()
class GetTransactionService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository
  ) {}

  public async execute({
    transactionId,
    userId,
  }: IRequest): Promise<Transaction | undefined> {
    const transaction = this.transactionsRepository.getTransaction(
      transactionId,
      userId
    );

    return transaction;
  }
}

export default GetTransactionService;
