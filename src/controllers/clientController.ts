import express from "express"
import { Client } from "../entities/Client";

export const createClient = async (req: express.Request, res: express.Response) => {
  const {
    firstName,
    lastName,
    email,
    cardNumber,
    balance
  } = req.body;

  // Execute create method does not actually save the data in DB
  // Only creates the object that we need to store in the DB
  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance
  });

  await client.save();

  return res.json(client);
}

export const deleteClient = async (req: express.Request, res: express.Response) => {
  const { clientId } = req.params

  if (!clientId) {
    return res.json({
      msg: "Client ID format is invalid"
    })
  }

  const response = await Client.delete(parseInt(clientId))

  return res.json(response)
}