import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Category from './Category';
import ColumnNumericTransformer from '../utils/ColumnNumericTransformer';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column('decimal', { transformer: new ColumnNumericTransformer() })
  value: number;

  // @Column('decimal', {
  //   precision: 10,
  //   scale: 2,
  //   transformer: new ColumnNumericTransformer(),
  // })
  // value: number;

  @Column({ select: false })
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => Category, category => category.transaction, { eager: true })
  // @JoinColumn({ name: 'category_id' })
  // category: Category;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}

export default Transaction;
