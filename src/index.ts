import express from "express"
import { createConnection } from "typeorm"
import { Banker } from "./entities/Banker"
import { Client } from "./entities/Client"
import { Transaction } from "./entities/Transaction"
import { routes } from "./routes/index"

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: undefined,
      database: "typeorm",
      // All my entities, entity = table in postgres
      entities: [Client, Banker, Transaction],
      // Syncronize all my entities with my Database
      synchronize: true
    })

    console.log("Connected to Postgres")

    // Parse the body for every request that we made
    app.use(express.json())

    // Create client router
    app.use(routes)

    app.listen(8080, () => {
      console.log("App running on port 8080");
    })
  } catch (error) {
    console.error(error)
    throw new Error("Unable to connect to Postgres")
  }
}

main()