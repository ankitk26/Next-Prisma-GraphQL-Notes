import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import * as Yup from "yup";
import FormikFormControl from "../../../components/FormikFormControl";
import Layout from "../../../components/Layout";
import { UpdateNoteMutation } from "../../../graphql/mutations";
import { GetNotesQuery, SingleNoteQuery } from "../../../graphql/queries";
import { INote, INoteInput } from "../../../types/types";

interface IData {
  note: INote;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  body: Yup.string().required("Required"),
});

export default function UpdateNote() {
  const router = useRouter();
  const noteId = Number(router.query.id);

  const { data } = useQuery<IData>(SingleNoteQuery, {
    variables: { noteId },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const [updateNote] = useMutation(UpdateNoteMutation, {
    refetchQueries: [GetNotesQuery, "AllNotes"],
  });

  const tempData = { title: "", subtitle: "", body: "", category: "" };
  const getData = () => data?.note || tempData;

  return (
    <Layout title="Update Note">
      <section className="flex flex-col">
        <h1 className="text-3xl">Update Note</h1>

        <Formik
          initialValues={getData()}
          enableReinitialize={true}
          validationSchema={NoteSchema}
          onSubmit={async (values: INoteInput) => {
            const { title, subtitle, body, category } = values;
            await updateNote({
              variables: {
                noteId,
                noteInput: { title, subtitle, body, category },
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
    </Layout>
  );
}
