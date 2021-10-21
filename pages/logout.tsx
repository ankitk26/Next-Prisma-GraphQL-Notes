import { useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { LogoutMutation } from "../graphql/mutations";

export default function Logout() {
  const client = useApolloClient();
  const { setUser } = useAuth();
  const router = useRouter();
  const [logout] = useMutation(LogoutMutation);

  useEffect(() => {
    logout().then(() => {
      client.resetStore().then(() => {
        setUser(null);
        router.push("/login");
      });
    });
  }, [logout, router, client]);

  return (
    <Layout title="Logging out">
      <p>Logging out</p>
    </Layout>
  );
}
