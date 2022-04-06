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
import { Field, Int, ObjectType } from 'type-graphql';

export enum TransactionTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw"
}

@ObjectType({ description: "Transaction Model" })
@Entity("transactions")
export class Transaction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // column enum
  @Field(() => String)
  @Column({
    type: "enum",
    enum: TransactionTypes
  })
  type: string;

  @Field(() => Int)
  @Column({
    type: "numeric"
  })
  amount: number;

  // ManyToOne relation
  @Field(() => Client)
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
  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  // Every time a record is updated, change the updated_at field
  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}