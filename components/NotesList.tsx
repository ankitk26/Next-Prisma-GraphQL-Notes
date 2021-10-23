import { INote } from "../types/types";
import NoteItem from "./NoteItem";
import Image from "next/image";

interface IProps {
  notes: [INote];
}

export default function NotesList({ notes }: IProps) {
  return (
    <div className="flex flex-col gap-8 mx-auto md:w-1/2">
      {notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note.id} note={note} />)
      ) : (
        <section className="flex flex-col items-center gap-10">
          <Image
            src="/no_notes.svg"
            height={300}
            width={300}
            alt="No notes found illustration"
          />
          <h4 className="text-lg text-gray-700">No notes added...</h4>
        </section>
      )}
    </div>
  );
}
