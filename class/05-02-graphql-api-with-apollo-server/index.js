// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    qqq: String
  }
`;

const resolvers = {
  Query: {
    qqq: () => {
      return "Hello World!";
    },
  },
};

const app = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

app.listen(3000).then(() => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});
