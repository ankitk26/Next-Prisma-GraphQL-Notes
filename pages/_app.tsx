import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import AuthProvider from "../context/AuthContext";
import { useApollo } from "../graphql/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
