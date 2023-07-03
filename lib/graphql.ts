import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new HttpLink({
        uri: "http://localhost:4000/graphql",
      })
    ]),
  });
});