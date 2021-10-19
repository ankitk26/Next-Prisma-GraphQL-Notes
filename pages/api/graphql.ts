import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "../../graphql/context";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/typeDefs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});
const cors = Cors();

const startServer = server.start();

export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
