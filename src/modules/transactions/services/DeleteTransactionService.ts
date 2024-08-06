import { injectable, inject } from "tsyringe";

import ITransactionsRepository from "../repositories/ITransactionsRepository";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";

interface IRequest {
  transactionId: string;
  userId: string;
}

@injectable()
class DeleteTransactionService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({ transactionId, userId }: IRequest): Promise<void> {
    this.transactionsRepository.delete(transactionId, userId);

    await this.notificationsRepository.create({
      recipient_id: userId,
      content: "Lançamento excluído com sucesso",
    });
  }
}

export default DeleteTransactionService;
