import AppError from "@shared/errors/AppError";
import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import UpdateTransactionService from "./UpdateTransactionService";

let fakeTransactionRepository: FakeTransactionRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let updateTransaction: UpdateTransactionService;

describe("UpdateTransaction", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    updateTransaction = new UpdateTransactionService(
      fakeTransactionRepository,
      fakeNotificationsRepository
    );
  });

  it("should be able to update a transaction", async () => {
    const transaction = await fakeTransactionRepository.create({
      date: new Date(2024, 2, 30, 14),
      user_id: "123123",
      description: "Compra shopee",
      observation: "Camiseta da alemanha 1990",
      type: "SAIDA",
      value: 89.9,
      category: "INVESTIMENTOS",
    });

    const updatedTransaction = await updateTransaction.execute({
      id: transaction.id,
      userId: "123123",
      date: new Date(2024, 2, 30, 14),
      description: "Compra shopee",
      observation: "Camiseta alemanha manga longa 2022",
      type: "SAIDA",
      value: 110,
    });

    expect(updatedTransaction.value).toBe(110);
    expect(updatedTransaction.observation).toBe(
      "Camiseta alemanha manga longa 2022"
    );
  });

  it("should not be able to update a value to zero", async () => {
    const transaction = await fakeTransactionRepository.create({
      date: new Date(2024, 2, 30, 14),
      user_id: "123123",
      description: "Compra shopee",
      observation: "Camiseta da alemanha 1990",
      type: "SAIDA",
      value: 89.9,
      category: "INVESTIMENTOS",
    });

    await expect(
      updateTransaction.execute({
        id: transaction.id,
        userId: "123123",
        date: new Date(2024, 2, 30, 14),
        description: "Compra shopee",
        observation: "Camiseta alemanha manga longa 2022",
        type: "SAIDA",
        value: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a value lower than zero", async () => {
    const transaction = await fakeTransactionRepository.create({
      date: new Date(2024, 2, 30, 14),
      user_id: "123123",
      description: "Compra shopee",
      observation: "Camiseta da alemanha 1990",
      type: "SAIDA",
      value: 89.9,
      category: "INVESTIMENTOS",
    });

    await expect(
      updateTransaction.execute({
        id: transaction.id,
        userId: "123123",
        date: new Date(2024, 2, 30, 14),
        description: "Compra shopee",
        observation: "Camiseta alemanha manga longa 2022",
        type: "SAIDA",
        value: -1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
