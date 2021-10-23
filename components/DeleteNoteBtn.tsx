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
    refetchQueries: [GetNotesQuery, "AllNotes"],
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
