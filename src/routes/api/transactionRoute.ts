import express from "express"
import * as transactionCtrl from "../../controllers/transactionController"

// create a route express
const router = express.Router()

// Example of a route (path and callback)
router.post('/client/:clientId/transaction', transactionCtrl.createTransaction);

export {
  router as transactionRoute
}