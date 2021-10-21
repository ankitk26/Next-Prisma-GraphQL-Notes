import { INote } from "../types/types";
import NoteItem from "./NoteItem";

interface IProps {
  notes: [INote];
}

export default function NotesList({ notes }: IProps) {
  return (
    <div className="flex flex-col w-1/2 gap-8 mx-auto">
      {notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note.id} note={note} />)
      ) : (
        <p>No notes added...</p>
      )}
    </div>
  );
}
