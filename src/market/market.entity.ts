// market.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Market {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vendor: string;

  @Column()
  discordid: string;

  @Column()
  buy: string;

  @Column()
  sell: string;

  @Column()
  stock: number;
}