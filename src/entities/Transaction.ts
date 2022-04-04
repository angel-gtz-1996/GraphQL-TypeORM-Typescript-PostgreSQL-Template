import { 
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Client } from "./Client";

export enum TransactionTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw"
}

@Entity("transactions")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // column enum
  @Column({
    type: "enum",
    enum: TransactionTypes
  })
  type: string;

  @Column({
    type: "numeric"
  })
  amount: number;

  // ManyToOne relation
  @ManyToOne(
    () => Client,
    client => client.transactions,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn({
    name: 'client_id'
  })
  client: Client

  // Every time a record is saved for first time, add automatically created_at field
  @CreateDateColumn()
  created_at: Date;

  // Every time a record is updated, change the updated_at field
  @UpdateDateColumn()
  updated_at: Date;
}