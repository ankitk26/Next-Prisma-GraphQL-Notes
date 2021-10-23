import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { DeleteNoteMutation } from "../graphql/mutations";
import { GetNotesQuery } from "../graphql/queries";

interface IProps {
  noteId: number;
}

export default function DeleteNoteBtn({ noteId }: IProps) {
  const router = useRouter();

  const [deleteNote] = useMutation<any, IProps>(DeleteNoteMutation, {
    // refetchQueries: [GetNotesQuery, "AllNotes"],
    update: (cache, { data }) => {
      const existingNotes: any = cache.readQuery({ query: GetNotesQuery });
      const newNotes = existingNotes?.notes.filter(
        (note: any) => note.id !== noteId
      );
      cache.writeQuery({
        query: GetNotesQuery,
        data: { notes: newNotes },
      });
    },
  });

  const handleDelete = async () => {
    await deleteNote({
      variables: { noteId },
    });
    router.push("/");
  };

  return (
    <button className="w-full btn" onClick={handleDelete}>
      Delete
    </button>
  );
}
