import { useApolloClient, useMutation } from "@apollo/client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import * as Yup from "yup";
import FormikFormControl from "../components/FormikFormControl";
import Layout from "../components/Layout";
import MyInput from "../components/MyInput";
import { useAuth } from "../context/AuthContext";
import { LoginMutation } from "../graphql/mutations";

interface Values {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const { setUser } = useAuth();
  const client = useApolloClient();
  const router = useRouter();

  const [login] = useMutation(LoginMutation);

  return (
    <Layout title="Login">
      <section className="flex flex-col items-center">
        <h1 className="text-3xl text-center">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (
            values: Values,
            { setFieldError }: FormikHelpers<Values>
          ) => {
            try {
              await client.resetStore();
              const { data } = await login({
                variables: {
                  userInput: values,
                },
              });
              if (data.loginUser) {
                setUser(data.loginUser);
                await router.push("/");
              }
            } catch (err) {
              if (err.message.includes("password")) {
                setFieldError("password", err.message);
              } else {
                setFieldError("email", err.message);
              }
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col w-full gap-8 mt-8 md:w-1/3">
              <FormikFormControl
                id="login_email"
                name="email"
                type="email"
                touched={touched.email}
                error={errors.email}
              />

              <FormikFormControl
                id="login_password"
                name="password"
                type="password"
                touched={touched.password}
                error={errors.password}
              />

              <p className="self-center text-sm text-gray-500">
                Not registered? Register{" "}
                <Link href="/register">
                  <a className="font-semibold text-gray-700">here</a>
                </Link>
              </p>

              <button
                type="submit"
                className="self-center w-full md:w-auto btn"
              >
                {isSubmitting ? (
                  <img src="/spinner.svg" alt="loading..." className="w-6" />
                ) : (
                  "Submit"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </Layout>
  );
}
