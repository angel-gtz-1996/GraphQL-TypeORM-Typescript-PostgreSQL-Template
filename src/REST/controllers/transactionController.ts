import express from "express";
import { Client } from "../../entities/Client";
import { Transaction, TransactionTypes } from "../../entities/Transaction";

export const createTransaction = async (req: express.Request, res: express.Response) => {
  const { clientId } = req.params;

  const { type, amount } = req.body;

  const client = await Client.findOne(parseInt(clientId));

  if (!client) {
    return res.json({
      msg: "client not found"
    })
  }

  const transaction = Transaction.create({
    amount,
    type,
    client
  })

  await transaction.save()

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = client.balance as number + amount
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance = client.balance as number - amount
  }

  await client.save()

  return res.json({
    msg: `${type} - transaction added`
  })
}