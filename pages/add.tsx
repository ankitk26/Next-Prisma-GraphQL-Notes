import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useEffect, useState } from "react";
import FormControl from "../components/FormControl";
import Layout from "../components/Layout";
import { AddNoteMutation } from "../graphql/mutations";
import { GetNotesQuery } from "../graphql/queries";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();
  const [addNote, { loading }] = useMutation(AddNoteMutation, {
    refetchQueries: [GetNotesQuery, "AllNotes"],
  });

  useEffect(() => {
    if (loading) {
      alert("Adding note");
    }
  }, [loading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, subtitle, body, category });

    const addedNote = await addNote({
      variables: {
        noteInput: { title, subtitle, body, category },
      },
    });
    if (addedNote) {
      router.push("/");
    }
  };

  return (
    <Layout title="Add Note">
      <section className="flex flex-col">
        <h1 className="text-3xl">Add Note</h1>
        <form className="flex flex-col gap-8 my-8" onSubmit={handleSubmit}>
          <FormControl
            id="add_title"
            label="Title"
            type="text"
            value={title}
            setValue={setTitle}
          />
          <FormControl
            id="add_subtitle"
            label="Subtitle"
            type="text"
            value={subtitle}
            setValue={setSubtitle}
          />
          <FormControl
            id="add_body"
            label="Body"
            type="textarea"
            value={body}
            setValue={setBody}
          />
          <FormControl
            id="add_category"
            label="Category"
            type="text"
            value={category}
            setValue={setCategory}
          />
          <button
            type="submit"
            className="px-6 w-[fit-content] py-2 text-white bg-primary rounded hover:bg-primary-dark"
          >
            Submit
          </button>
        </form>
      </section>
    </Layout>
  );
}
