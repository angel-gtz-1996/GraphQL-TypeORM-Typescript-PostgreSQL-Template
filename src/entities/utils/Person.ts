import { 
  Entity, 
  BaseEntity, 
  Column, 
  PrimaryGeneratedColumn
} from "typeorm"

//Entity name should be empty
@Entity()
// expand baseEntity to make CRUD operations 
export class Person extends BaseEntity {

  // On an primaryColumn you can put { type: "uuid" }
  // Primary generated column, will generate automatically an auto-incremental id
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    unique: true,
    length: 10
  })
  card_number: string;
}