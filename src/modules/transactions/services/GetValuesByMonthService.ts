import { injectable, inject } from "tsyringe";

import ITransactionsRepository from "../repositories/ITransactionsRepository";

import IGetValuesByMonthDTO from "@modules/transactions/dtos/IGetValuesByMonthDTO";

interface IRequest {
  user_id: string;
}

@injectable()
class GetValuesByMonthService {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<IGetValuesByMonthDTO[]> {
    let transactions = await this.transactionsRepository.getAllTransactions(
      "",
      user_id
    );

    transactions.sort((a, b) => {
      const monthA = new Date(a.date).getMonth();
      const monthB = new Date(b.date).getMonth();
      return monthA - monthB;
    });

    const grouped: IGetValuesByMonthDTO[] = [];

    transactions.forEach((transaction) => {
      let month = transaction.date
        .toLocaleString("pt-br", { month: "long" })
        .substring(0, 3);

      month = month.charAt(0).toUpperCase() + month.slice(1);

      const year = transaction.date.getFullYear().toString().slice(-2);

      const key = `${month} ${year}`;

      let monthObj = grouped.find((item) => item.month === key);

      if (!monthObj) {
        monthObj = {
          month: key,
          totalIncomes: 0,
          totalOutcomes: 0,
          monthBalance: 0,
        };
        grouped.push(monthObj);
      }

      if (transaction.type === "ENTRADA") {
        monthObj.totalIncomes =
          Number(monthObj.totalIncomes) + Number(transaction.value);
      } else if (transaction.type === "SAIDA") {
        monthObj.totalOutcomes =
          Number(monthObj.totalOutcomes) + Number(transaction.value);
      }

      monthObj.monthBalance =
        Number(monthObj.totalIncomes) - Number(monthObj.totalOutcomes);

      monthObj.totalIncomes = parseFloat(monthObj.totalIncomes.toFixed(2));
      monthObj.totalOutcomes = parseFloat(monthObj.totalOutcomes.toFixed(2));
      monthObj.monthBalance = parseFloat(monthObj.monthBalance.toFixed(2));
    });

    return grouped;
  }
}

export default GetValuesByMonthService;
