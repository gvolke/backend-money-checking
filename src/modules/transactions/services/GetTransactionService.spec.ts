import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import GetTransactionService from "./GetTransactionService";

let fakeTransactionRepository: FakeTransactionRepository;
let getTransaction: GetTransactionService;

describe("GetTransaction", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();

    getTransaction = new GetTransactionService(fakeTransactionRepository);
  });

  it("should be able to get a transaction", async () => {
    const transaction = await fakeTransactionRepository.create({
      date: new Date(2024, 2, 30, 14),
      user_id: "123123",
      description: "Rendimento Nubank",
      observation: "Dinheiro guardado",
      type: "ENTRADA",
      value: 160,
      category: "INVESTIMENTOS",
    });

    const selectedTransaction = await getTransaction.execute({
      transactionId: transaction.id,
      userId: transaction.user_id,
    });

    expect(selectedTransaction).toEqual(transaction);
  });
});
