import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import DeleteTransactionService from "./DeleteTransactionService";

let fakeTransactionRepository: FakeTransactionRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let deleteTransaction: DeleteTransactionService;

describe("DeleteTransaction", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    deleteTransaction = new DeleteTransactionService(
      fakeTransactionRepository,
      fakeNotificationsRepository
    );
  });

  it("should be able to delete a transaction", async () => {
    const transaction = await fakeTransactionRepository.create({
      date: new Date(2024, 2, 30, 14),
      user_id: "123123",
      description: "Rendimento Nubank",
      observation: "Dinheiro guardado",
      type: "ENTRADA",
      value: 160,
      category: "INVESTIMENTOS",
    });

    await deleteTransaction.execute({
      transactionId: transaction.id,
      userId: transaction.user_id,
    });

    const deletedTransaction = await fakeTransactionRepository.getTransaction(
      transaction.id,
      transaction.user_id
    );

    expect(deletedTransaction).toBeUndefined();
  });
});
