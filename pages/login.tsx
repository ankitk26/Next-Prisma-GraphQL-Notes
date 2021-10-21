import { useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FormEvent, useState } from "react";
import FormControl from "../components/FormControl";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { LoginMutation } from "../graphql/mutations";

export default function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const client = useApolloClient();
  const router = useRouter();

  const [login] = useMutation(LoginMutation);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();

    try {
      await client.resetStore();
      const { data } = await login({
        variables: {
          userInput: { email, password },
        },
      });
      if (data.loginUser) {
        setUser(data.loginUser);
        await router.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout title="Login">
      <section className="flex flex-col items-center">
        <h1 className="text-3xl text-center">Login</h1>
        {error && <p className="mt-10 text-red-600">{error}</p>}
        <form
          className="flex flex-col w-1/3 gap-8 mt-8"
          onSubmit={handleSubmit}
        >
          <FormControl
            id="login_email"
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <FormControl
            id="login_password"
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />

          <p className="self-center text-sm text-gray-500">
            Not registered? Register{" "}
            <Link href="/register">
              <a className="font-semibold text-gray-700">here</a>
            </Link>
          </p>

          <button
            type="submit"
            className="self-center px-6 py-2 text-white rounded bg-primary hover:bg-primary-dark"
          >
            Submit
          </button>
        </form>
      </section>
    </Layout>
  );
}
