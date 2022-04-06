import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../../entities/Client';

export const createClient = async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  // Execute create method does not actually save the data in DB
  // Only creates the object that we need to store in the DB
  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  });

  await client.save();

  return res.json(client);
};

export const deleteClient = async (req: express.Request, res: express.Response) => {
  const { clientId } = req.params;

  if (!clientId) {
    return res.json({
      msg: 'Client ID format is invalid',
    });
  }

  const response = await Client.delete(parseInt(clientId, 10));

  return res.json(response);
};

export const getClients = async (_: express.Request, res: express.Response) => {
  const clients = await createQueryBuilder('client')
    .select('client.first_name')
    .addSelect('client.balance')
    .from(Client, 'client')
    .getMany();

  return res.json(clients);
};

export const getClientById = async (req: express.Request, res: express.Response) => {
  const { clientId } = req.params;

  // # NOTE TO CREATE A QUERY BUILDER
  // create query builder allow us to create more advanced queries
  // const client = await createQueryBuilder(
  //   'client'
  // )
  //   .select('client.first_name') //select the field that are gonna show e.g. client.first_name
  //   // .addSelect('client') // Add more than one field to the output
  //   // .addSelect("SUM(transaction)", "sum")
  //   .from(Client, 'client')
  //   .orderBy("client.first_name")
  //   .where('client.id = :clientId', { clientId: 5 })
  //   .getOne()

  const client = await createQueryBuilder('client')
    .select('client') // select the field that are gonna show e.g. client.first_name
    .from(Client, 'client')
    // .where('client.balance >= :balance AND client.balance <= :maxBalance', { balance: 5000 })
    .where('client.id = :clientId', { clientId })
    .getOne();

  if (!client) {
    return res.json({
      msg: 'Client not found',
    });
  }

  return res.json(client);
};
