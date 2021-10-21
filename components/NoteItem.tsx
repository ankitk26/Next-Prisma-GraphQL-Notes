import Link from "next/link";
import { INote } from "../types/types";
import { fmtSS } from "../utils/fmtSS";

interface IProps {
  note: INote;
}

export default function NoteItem({ note }: IProps) {
  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      {note.category && <span className="text-sm">#{note.category}</span>}

      <div className="flex items-center justify-between">
        <Link href={`/note/${note.id}`}>
          <a>
            <h1 className="text-xl font-semibold text-gray-900">
              {note.title}
            </h1>
          </a>
        </Link>
        <span className="text-sm">{fmtSS(note.createdAt)}</span>
      </div>

      <h4 className="text-gray-800">{note.subtitle}</h4>
      <p className="mt-4 text-sm text-gray-900 truncate">{note.body}</p>
    </div>
  );
}
