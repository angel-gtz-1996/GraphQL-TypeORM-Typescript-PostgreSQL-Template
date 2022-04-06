import express from "express";
import { routes } from "./REST/routes/index";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

export const startServer = async () => {
  const app = express();

  //GraphQL server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/GraphQL/resolvers/**/*.ts']
    }),
    context: ({ req, res }) => ({ req, res })
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  // Parse the body for every request that we make
  app.use(express.json());

  // Use routes for REST API
  app.use(routes);

  return app;
}