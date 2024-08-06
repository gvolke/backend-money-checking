import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import GetValuesByCategoryService from "./GetValuesByCategoryService";

let fakeTransactionRepository: FakeTransactionRepository;
let getValuesByCategory: GetValuesByCategoryService;

describe("GetTransaction", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();

    getValuesByCategory = new GetValuesByCategoryService(
      fakeTransactionRepository
    );
  });

  it("should be able to get the total values of the transactions grouped by gategory", async () => {
    const firstTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 6, 8, 14),
      user_id: "123123",
      description: "Sekiro: Shadows Die Twice",
      observation: "",
      type: "SAIDA",
      value: 139.9,
      category: "LAZER",
    });

    const secondTransaction = await fakeTransactionRepository.create({
      date: new Date(2024, 6, 9, 14),
      user_id: "123123",
      description: "Elden Ring: Shadow of the Erdtree",
      observation: "",
      type: "SAIDA",
      value: 200,
      category: "LAZER",
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

    const transactions = await getValuesByCategory.execute({
      user_id: "123123",
    });

    expect(transactions).toEqual(
      expect.arrayContaining([
        {
          category: "LAZER",
          value: 339.9,
        },
        {
          category: "ALIMENTACAO",
          value: 100,
        },
      ])
    );
  });
});
