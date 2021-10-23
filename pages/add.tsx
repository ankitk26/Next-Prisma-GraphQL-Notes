import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import * as Yup from "yup";
import FormikFormControl from "../components/FormikFormControl";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { AddNoteMutation } from "../graphql/mutations";
import { GetNotesQuery } from "../graphql/queries";

interface Values {
  title: "";
  subtitle: "";
  body: "";
  category: "";
}

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  body: Yup.string().required("Required"),
});

export default function AddNote() {
  const { user } = useAuth();

  const router = useRouter();
  const [addNote] = useMutation(AddNoteMutation, {
    refetchQueries: [GetNotesQuery, "AllNotes"],
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <Layout title="Add Note">
      {user && (
        <section className="flex flex-col">
          <h1 className="text-3xl">Add Note</h1>
          <Formik
            initialValues={{ title: "", subtitle: "", body: "", category: "" }}
            validationSchema={NoteSchema}
            onSubmit={async (values: Values) => {
              await addNote({
                variables: {
                  noteInput: values,
                },
              });
              router.push("/");
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className="flex flex-col gap-8 my-8">
                <FormikFormControl
                  id="add_title"
                  name="title"
                  touched={touched.title}
                  error={errors.title}
                />

                <FormikFormControl id="add_subtitle" name="subtitle" />

                <FormikFormControl
                  id="add_body"
                  name="body"
                  type="textarea"
                  touched={touched.body}
                  error={errors.body}
                />

                <FormikFormControl id="add_category" name="category" />

                <button type="submit" className="md:w-[fit-content] btn">
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
      )}
    </Layout>
  );
}
