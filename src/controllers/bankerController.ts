
import { Banker } from "../entities/Banker"
import express from "express"

export const createBanker = async (req: express.Request, res: express.Response) => {
  const {
    firstName,
    lastName,
    email,
    cardNumber,
    employeeNumber
  } = req.body;

  // Execute create method does not actually save the data in DB
  // Only creates the object that we need to store in the DB
  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber
  });

  await banker.save()

  return res.json(banker)
}