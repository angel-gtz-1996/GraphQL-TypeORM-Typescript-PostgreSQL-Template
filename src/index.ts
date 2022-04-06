import { DBconnection } from './config/typeorm';
import { startServer } from './app';
import 'dotenv/config';

const PORT = 8080;

const main = async () => {
  // Database connection
  DBconnection();

  // Start graphQL server && Rest API
  const app = await startServer();

  app.listen(8080, () => {
    console.log(`App running on port ${PORT}`);
  });
};

main();
