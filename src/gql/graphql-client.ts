import { ApolloClient, InMemoryCache } from '@apollo/client';

const graphqlClient = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache(),
});

export default graphqlClient;
