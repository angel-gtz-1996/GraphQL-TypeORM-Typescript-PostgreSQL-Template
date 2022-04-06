import { Arg, Field, InputType, Mutation, Resolver, Int, Query } from 'type-graphql';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../../entities/Client';

@InputType()
class ClientInput {
  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field()
  email!: string;

  @Field()
  card_number!: string;

  @Field(() => Int, { nullable: true })
  balance?: number;
}

@InputType()
class UpdateClientInput {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String, { nullable: true })
  first_name!: string;

  @Field(() => String, { nullable: true })
  last_name!: string;

  @Field(() => String, { nullable: true })
  email!: string;

  @Field(() => String, { nullable: true })
  card_number!: string;
}

@InputType()
class ClientId {
  @Field(() => Int, { nullable: false })
  id!: number;
}

@Resolver()
export class ClientResolver {
  // Get all clients
  @Query(() => [Client]) // GraphQl return response
  async getClients() {
    const clients = await createQueryBuilder('client').select('client').from(Client, 'client').getMany();

    return clients; // Function return must be consisten in return all
  }

  // Get Client by ID
  @Query(() => Client)
  async getClientById(@Arg('data', () => ClientId) data: ClientId) {
    const client = await createQueryBuilder('client')
      .select('client')
      .from(Client, 'client')
      .where('client.id = :clientId', { clientId: data.id })
      .getOne();

    return client;
  }

  // Create new client mutation
  @Mutation(() => Client)
  async createClient(@Arg('data', () => ClientInput) data: ClientInput) {
    const newClient = Client.create(data);

    return await newClient.save();
  }

  // Update Client Mutation
  @Mutation(() => Client)
  async updateClient(@Arg('data', () => UpdateClientInput) data: UpdateClientInput) {
    const getClient = await Client.findOne(data.id);

    const dataToUpdate = {
      first_name: data.first_name || getClient?.first_name,
      last_name: data.last_name || getClient?.last_name,
      email: data.email || getClient?.email,
      card_number: data.card_number || getClient?.card_number,
    };

    await createQueryBuilder('client')
      .update(Client)
      .set(dataToUpdate)
      .where('client.id = :clientId', { clientId: data.id })
      .execute();

    const updatedClient = await Client.findOne(data.id);

    return updatedClient;
  }

  // Delete Client Mutation
  @Mutation(() => Boolean)
  async deleteClient(@Arg('data', () => ClientId) data: ClientId) {
    const clientId = data.id;

    await Client.delete(clientId);
    return true;
  }
}
