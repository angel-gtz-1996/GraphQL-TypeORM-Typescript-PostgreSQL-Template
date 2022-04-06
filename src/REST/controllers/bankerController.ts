import express from 'express';
import { Banker } from '../../entities/Banker';
import { Client } from '../../entities/Client';

export const createBanker = async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

  // Execute create method does not actually save the data in DB
  // Only creates the object that we need to store in the DB
  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });

  await banker.save();

  return res.json(banker);
};

export const connectBankToClient = async (req: express.Request, res: express.Response) => {
  // URL params
  const { bankerId, clientId } = req.params;

  const client = await Client.findOne(parseInt(clientId, 10));
  const banker = await Banker.findOne(parseInt(bankerId, 10));

  console.log(client, banker);

  if (!banker || !client) {
    return res.json({
      msg: 'Banker or client not found',
    });
  }

  // Update value
  banker.clients = [client];

  await banker.save();

  return res.json({
    msg: 'Banker connected to client',
  });
};
