import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import GetValuesByMonthService from "./GetValuesByMonthService";

let fakeTransactionRepository: FakeTransactionRepository;
let getValuesByMonth: GetValuesByMonthService;

describe("GetTransaction", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();

    getValuesByMonth = new GetValuesByMonthService(fakeTransactionRepository);
  });

  it("should be able to get the total values of the transactions separated by month", async () => {
    const firstTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 6, 8, 14),
      user_id: "123123",
      description: "Rendimento Nubank",
      observation: "Dinheiro guardado",
      type: "ENTRADA",
      value: 160,
      category: "INVESTIMENTOS",
    });

    const secondTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 6, 9, 14),
      user_id: "123123",
      description: "Tigrinho",
      observation: "",
      type: "ENTRADA",
      value: 100,
      category: "INVESTIMENTOS",
    });

    const thirdTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 5, 9, 14),
      user_id: "123123",
      description: "Jantar",
      observation: "",
      type: "SAIDA",
      value: 100,
      category: "ALIMENTACAO",
    });

    const transactions = await getValuesByMonth.execute({
      user_id: "123123",
    });

    expect(transactions).toEqual(
      expect.arrayContaining([
        {
          month: "Jul 24",
          totalIncomes: 260,
          totalOutcomes: 0,
          monthBalance: 260,
        },
        {
          month: "Jun 24",
          totalIncomes: 0,
          totalOutcomes: 100,
          monthBalance: -100,
        },
      ])
    );
  });
});
