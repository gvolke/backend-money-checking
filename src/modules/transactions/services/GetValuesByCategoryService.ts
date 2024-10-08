import { injectable, inject } from "tsyringe";

import ITransactionsRepository from "../repositories/ITransactionsRepository";

interface IRequest {
  user_id: string;
}

interface categoryGroupedData {
  category: string;
  value: number;
}

@injectable()
class GetValuesByCategoryService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<categoryGroupedData[]> {
    let transactions = await this.transactionsRepository.getAllTransactions(
      "",
      user_id
    );

    const grouped: categoryGroupedData[] = [];

    transactions.forEach((transaction) => {
      const key = transaction.category;

      let categoryObj = grouped.find((item) => item.category === key);

      if (!categoryObj) {
        categoryObj = {
          category: key,
          value: 0,
        };
        grouped.push(categoryObj);
      }

      categoryObj.value =
        Number(categoryObj.value.toFixed(2)) +
        Number(transaction.value.toFixed(2));
    });

    return grouped;
  }
}

export default GetValuesByCategoryService;
