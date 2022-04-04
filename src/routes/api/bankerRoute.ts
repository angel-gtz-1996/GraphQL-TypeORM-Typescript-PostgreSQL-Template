import express from "express"
import * as bankerCtrl from "../../controllers/bankerController";

// create a route express
const router = express.Router()

// Example of a route (path and callback)
router.post('/', bankerCtrl.createBanker);

export {
  router as bankerRoute
}