import { 
  Entity, 
  Column, 
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany
} from "typeorm"
import { Banker } from "./Banker";
import { Transaction } from "./Transaction";
import { Person } from "./utils/Person"

@Entity('client')
// extends Person to take those fields in Client entity
export class Client extends Person {
  @Column({
    type: "numeric"
  })
  balance: number;

  @Column({
    default: true,
    // Change the column name
    name: "active"
  })
  is_active: boolean;

  // Store a JSON
  @Column({
    type: "simple-json",
    nullable: true
  })
  additional_info: {
    age: number;
    hair_color: string;
  }

  // store simple array
  @Column({
    type: "simple-array",
    default: []
  })
  family_members: string[]

  // OneToMany with transaction Entity
  @OneToMany(
    () => Transaction,
    transaction => transaction.client
  )
  transactions: Transaction[]
  /* 
    We do not need to specify a join column, cause we don't need to
    have in this entity a foreign key
    Note: is common use on the many side not on the one side.
  */

  // ManyToMany with Banker entity
  @ManyToMany(
    () => Banker,
    {
      cascade: true
    }
  )
  bankers: Banker[]

  // CreateDateColumn, every time a record is created, insert a create_at date
  @CreateDateColumn()
  created_at: Date;

  // UpdateColumn, every time a record is updated, update updated_at field
  @UpdateDateColumn()
  updated_at: Date;
}