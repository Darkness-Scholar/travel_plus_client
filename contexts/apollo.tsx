"use client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context" 
import useJsonWebToken  from "@/helpers/jwt"
import {
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink
} from "@apollo/experimental-nextjs-app-support/ssr";

const authLink = setContext((_, { headers }) => {
  const token = useJsonWebToken.getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {

  console.log(`loi roi ban oi`)
  
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
    //fetchOptions: { cache: "no-store" },
  });

  const client = authLink.concat(httpLink)

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          errorLink,
          new SSRMultipartLink({
            stripDefer: true,
          }),
          client,
        ])
        : client,
  });
}


export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
    >
      {children}
    </ApolloNextAppProvider>
  );
}