import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    let categoryData = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categoryData) {
      categoryData = categoryRepository.create({ title: category });
      await categoryRepository.save(categoryData);
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new AppError('Value greater than the total');
    }

    const newTransaction = transactionsRepository.create({
      title,
      type,
      value,
      category: categoryData,
    });

    await transactionsRepository.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
