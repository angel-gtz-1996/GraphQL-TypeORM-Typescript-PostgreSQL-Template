import express from "express"
import * as clientCtrl from "../../controllers/clientController";

// create a route express
const router = express.Router()

// Example of a route (path and callback)
router
  .get('/', clientCtrl.getClients)
  .post('/', clientCtrl.createClient)
router
  .get('/:clientId', clientCtrl.getClientById)
  .delete('/:clientId', clientCtrl.deleteClient)

export {
  router as clientRoute
}