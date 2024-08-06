import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import ListAllTransactionsService from "./ListAllTransactionsService";

let fakeTransactionRepository: FakeTransactionRepository;
let listAllTransactionsService: ListAllTransactionsService;

describe("GetTransaction", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();

    listAllTransactionsService = new ListAllTransactionsService(
      fakeTransactionRepository
    );
  });

  it("should be able to return array of transactions", async () => {
    const firstTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 4, 8),
      user_id: "123123",
      description: "Rendimento Nubank",
      observation: "Dinheiro guardado",
      type: "ENTRADA",
      value: 160,
      category: "INVESTIMENTOS",
    });

    const secondTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 4, 10),
      user_id: "123123",
      description: "Compras mensais",
      observation: "Compras de mercado, coisas para casa",
      type: "SAIDA",
      value: 500,
      category: "INVESTIMENTOS",
    });

    const thirdTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 5, 7),
      user_id: "123123",
      description: "Salario",
      observation: "",
      type: "ENTRADA",
      value: 2500,
      category: "INVESTIMENTOS",
    });

    const allTransactions = await listAllTransactionsService.execute({
      description: "",
      user_id: "123123",
    });

    expect(allTransactions).toEqual(
      expect.arrayContaining([
        { transaction: firstTransaction, balance: 160 },
        { transaction: secondTransaction, balance: -340 },
        { transaction: thirdTransaction, balance: 2160 },
      ])
    );
  });

  it("should be able to return array of transactions filtering by description", async () => {
    const firstTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 4, 8),
      user_id: "123123",
      description: "Rendimento Nubank",
      observation: "Dinheiro guardado",
      type: "ENTRADA",
      value: 160,
      category: "INVESTIMENTOS",
    });

    const secondTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 4, 10),
      user_id: "123123",
      description: "Compras mensais",
      observation: "Compras de mercado, coisas para casa",
      type: "SAIDA",
      value: 500,
      category: "MERCADO",
    });

    const thirdTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 5, 7),
      user_id: "123123",
      description: "Salario",
      observation: "",
      type: "ENTRADA",
      value: 2500,
      category: "SALARIO",
    });

    const allTransactions = await listAllTransactionsService.execute({
      description: "Nub",
      user_id: "123123",
    });

    expect(allTransactions).toEqual(
      expect.arrayContaining([{ transaction: firstTransaction, balance: 160 }])
    );
  });
});
