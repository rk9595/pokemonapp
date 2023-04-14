import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import graphqlClient from '../gql/graphql-client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={graphqlClient}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}
