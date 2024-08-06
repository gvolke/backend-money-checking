import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import ListTransactionsMonthService from "./ListTransactionsMonthService";

let fakeTransactionRepository: FakeTransactionRepository;
let listTransactionsMonthService: ListTransactionsMonthService;

describe("GetTransactionsInMonth", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();
    listTransactionsMonthService = new ListTransactionsMonthService(
      fakeTransactionRepository
    );
  });

  it("should be able to return all transactions in month, with balance", async () => {
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

    const transactionsMonth = await listTransactionsMonthService.execute({
      user_id: "123123",
      month: 5,
      year: 2024,
    });

    expect(transactionsMonth).toEqual(
      expect.arrayContaining([{ transaction: thirdTransaction, balance: 2500 }])
    );
  });
});
