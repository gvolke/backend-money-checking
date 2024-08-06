import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import CreateTransactionService from "./CreateTransactionService";

let fakeTransactionRepository: FakeTransactionRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createTransaction: CreateTransactionService;

import AppError from "@shared/errors/AppError";

describe("CreateTransaction", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createTransaction = new CreateTransactionService(
      fakeTransactionRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to create a new transaction", async () => {
    const transaction = await createTransaction.execute({
      date: new Date(2024, 2, 30, 14),
      user_id: "123123",
      description: "almoço",
      observation: "almoço habib's rodízio",
      type: "SAIDA",
      value: 50,
      category: "ALIMENTAÇÃO",
    });

    expect(transaction).toHaveProperty("id");
    expect(transaction.user_id).toBe("123123");
  });

  it("should not be able to create a new transaction without type, value and description", async () => {
    await expect(
      createTransaction.execute({
        date: new Date(2024, 2, 30, 14),
        user_id: "123123",
        description: "",
        observation: "almoço habib's rodízio",
        type: "",
        value: 0,
        category: "ALIMENTAÇÃO",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new transaction without a date", async () => {
    await expect(
      createTransaction.execute({
        date: null,
        user_id: "123123",
        description: "almoço",
        observation: "almoço habib's rodízio",
        type: "SAIDA",
        value: 50,
        category: "ALIMENTAÇÃO",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new transaction with value lower than zero", async () => {
    await expect(
      createTransaction.execute({
        date: new Date(2024, 2, 30, 14),
        user_id: "123123",
        description: "jogo novo",
        observation: "",
        type: "SAIDA",
        value: -350,
        category: "LAZER",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
