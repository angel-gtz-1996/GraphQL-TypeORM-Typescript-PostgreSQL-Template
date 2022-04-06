import { Length } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Entity name should be empty
@ObjectType({ description: 'Person Model' })
@Entity()
// expand baseEntity to make CRUD operations
export class Person extends BaseEntity {
  // On an primaryColumn you can put { type: "uuid" }
  // Primary generated column, will generate automatically an auto-incremental id
  @Field(() => ID) // Fields are the types that GraphQL return
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @Length(2, 50)
  first_name: string;

  @Field(() => String)
  @Column()
  @Length(2, 50)
  last_name: string;

  @Field(() => String)
  @Column({
    unique: true,
  })
  email: string;

  @Field(() => String)
  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;
}
