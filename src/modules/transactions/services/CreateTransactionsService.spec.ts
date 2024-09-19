import FakeTransactionRepository from "../repositories/fakes/FakeTransactionRepository";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import CreateTransactionsService from "./CreateTransactionsService";

let fakeTransactionRepository: FakeTransactionRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createTransactions: CreateTransactionsService;

import AppError from "@shared/errors/AppError";

describe("CreateTransactions", () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createTransactions = new CreateTransactionsService(
      fakeTransactionRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to create many new transactions", async () => {
    const user_id = "123123";

    const transactions = [
      {
        date: new Date(2024, 8, 16, 14),
        description: "parcela livros",
        observation: "parcelas dos livros comprados no site da darkside",
        user_id: "",
        type: "SAIDA",
        value: 50,
        category: "LAZER",
      },
      {
        date: new Date(2024, 9, 16, 14),
        description: "parcela livros",
        observation: "parcelas dos livros comprados no site da darkside",
        user_id: "",
        type: "SAIDA",
        value: 50,
        category: "LAZER",
      },
    ];

    const createdTransactions = await createTransactions.execute(
      transactions,
      user_id
    );

    expect(createdTransactions.length).toBe(2);
    expect(createdTransactions).toEqual(transactions);
  });
});
