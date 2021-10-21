import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useEffect, useState } from "react";
import FormControl from "../../../components/FormControl";
import Layout from "../../../components/Layout";
import { UpdateNoteMutation } from "../../../graphql/mutations";
import { GetNotesQuery, SingleNoteQuery } from "../../../graphql/queries";
import { INote } from "../../../types/types";

interface IData {
  note: INote;
}

export default function UpdateNote() {
  const router = useRouter();
  const noteId = Number(router.query.id);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const { data } = useQuery<IData>(SingleNoteQuery, {
    variables: { noteId },
    onCompleted: (data) => {
      if (data.note) {
        const { note } = data;
        setTitle(note.title);
        setSubtitle(note.subtitle);
        setBody(note.body);
        setCategory(note.category);
      }
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const [updateNote] = useMutation(UpdateNoteMutation, {
    refetchQueries: [GetNotesQuery, "AllNotes"],
    onCompleted: (data) => {
      if (data.updateNote) {
        router.push("/");
      }
    },
  });

  // useEffect(() => {
  //   if (loading) {
  //     alert("Adding note");
  //   }
  // }, [loading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateNote({
      variables: {
        noteId,
        noteInput: { title, subtitle, body, category },
      },
    });
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
