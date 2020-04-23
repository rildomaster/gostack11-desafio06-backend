import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    // let income = 0;
    // let outcome = 0;
    // transactions.forEach((item: Transaction) => {
    //   income += item.type === 'income' ? Number(item.value) : 0;
    //   outcome += item.type === 'outcome' ? Number(item.value) : 0;
    // });
    // const total = income - outcome;

    const { income, outcome } = transactions.reduce(
      (accumulator, item) => {
        accumulator.income += item.type === 'income' ? item.value : 0;
        accumulator.outcome += item.type === 'outcome' ? item.value : 0;
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
