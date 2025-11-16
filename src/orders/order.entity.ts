import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column('json')
  items!: { productId: string; qty: number }[];
}
