import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FormEvent, useState } from "react";
import FormControl from "../components/FormControl";
import Layout from "../components/Layout";
import { RegisterMutation } from "../graphql/mutations";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useMutation(RegisterMutation);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register({
        variables: {
          userInput: { email, password },
        },
      });
      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout title="Register">
      <section className="flex flex-col items-center">
        <h1 className="text-3xl text-center">Register</h1>
        {error && <p className="mt-10 text-red-600">{error}</p>}
        <form
          className="flex flex-col w-1/3 gap-8 mt-8"
          onSubmit={handleSubmit}
        >
          <FormControl
            id="register_email"
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <FormControl
            id="register_password"
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />

          <p className="self-center text-sm text-gray-500">
            Already registered? Login{" "}
            <Link href="/login">
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
