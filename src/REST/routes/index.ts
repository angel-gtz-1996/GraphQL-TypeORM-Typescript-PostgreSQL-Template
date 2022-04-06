import express from "express"
import { router as API_ROUTES } from "./api";

const router = express.Router();

// INITIAL ROUTE
router.get("/", (_: express.Request, res: express.Response) => {
  res.json(`Welcome to Rest API, GraphQL, TypeORM and Typescript template`)
})

// API REST ROUTES
router.use("/api", API_ROUTES);

export { router as routes };
