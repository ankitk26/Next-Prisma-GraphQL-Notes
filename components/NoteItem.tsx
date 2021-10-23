import Link from "next/link";
import { INote } from "../types/types";
import { fmtSS } from "../utils/fmtSS";

interface IProps {
  note: INote;
}

export default function NoteItem({ note }: IProps) {
  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      {note.category && (
        <span className="text-sm italic">#{note.category}</span>
      )}

      <div className="flex flex-col justify-between md:items-center md:flex-row">
        <Link href={`/note/${note.id}`}>
          <a>
            <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
              {note.title}
            </h1>
          </a>
        </Link>
        <span className="hidden text-sm md:block">{fmtSS(note.createdAt)}</span>
      </div>

      <h4 className="text-sm font-medium text-gray-600 md:text-base">
        {note.subtitle}
      </h4>
      <span className="block mt-5 text-xs md:hidden">
        {fmtSS(note.createdAt)}
      </span>
      <p className="mt-2 text-sm text-gray-900 truncate md:mt-4">{note.body}</p>
    </div>
  );
}
