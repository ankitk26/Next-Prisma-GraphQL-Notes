import { useApolloClient, useMutation } from "@apollo/client";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import * as Yup from "yup";
import FormikFormControl from "../components/FormikFormControl";
import Layout from "../components/Layout";
import { RegisterMutation } from "../graphql/mutations";

interface Values {
  email: string;
  name: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Minimum 6 characters required"),
});

export default function Register() {
  const client = useApolloClient();
  const router = useRouter();

  const [register] = useMutation(RegisterMutation);

  return (
    <Layout title="Register">
      <section className="flex flex-col items-center">
        <h1 className="text-3xl text-center">Register</h1>
        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={async (
            values: Values,
            { setFieldError }: FormikHelpers<Values>
          ) => {
            try {
              await client.resetStore();
              await register({
                variables: {
                  userInput: values,
                },
              });
              router.push("/");
            } catch (err) {
              setFieldError("email", err.message);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col w-full gap-8 mt-8 md:w-1/3">
              <FormikFormControl
                id="register_email"
                name="email"
                type="email"
                touched={touched.email}
                error={errors.email}
              />
              <FormikFormControl
                id="register_name"
                name="name"
                touched={touched.name}
                error={errors.name}
              />
              <FormikFormControl
                id="register_password"
                name="password"
                type="password"
                touched={touched.password}
                error={errors.password}
              />

              <p className="self-center text-sm text-gray-500">
                Already registered? Login{" "}
                <Link href="/login">
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
