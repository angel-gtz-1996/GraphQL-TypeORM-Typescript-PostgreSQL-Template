import express from "express"
import * as clientCtrl from "../../controllers/clientController";

// create a route express
const router = express.Router()

// Example of a route (path and callback)
router.post('/', clientCtrl.createClient);

export {
  router as clientRoute
}