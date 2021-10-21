import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { DeleteNoteMutation } from "../graphql/mutations";
import { GetNotesQuery } from "../graphql/queries";

interface IProps {
  noteId: number;
}

export default function DeleteNoteBtn({ noteId }: IProps) {
  const router = useRouter();

  const [deleteNote] = useMutation(DeleteNoteMutation, {
    refetchQueries: [GetNotesQuery, "AllNotes"],
  });

  const handleDelete = async () => {
    await deleteNote({
      variables: { noteId },
    });
    router.push("/");
  };

  return (
    <button
      className="px-4 py-1 text-white rounded bg-primary"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
