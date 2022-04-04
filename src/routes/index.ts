import express from "express"
import { router as API_ROUTES } from "./api";

const router = express.Router();

router.use("/api", API_ROUTES);

export { router as routes };
