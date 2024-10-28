import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support';

if (!process.env.GQL_URL) throw new Error('GraphQL URL is missing.');

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.GQL_URL,
      headers: {
        authorization: `Bearer ${process.env.AUTH_ACCESS_TOKEN}`,
      },
    }),
  });
});
