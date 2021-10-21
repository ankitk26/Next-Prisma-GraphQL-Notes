import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import DeleteNoteBtn from "../../../components/DeleteNoteBtn";
import Layout from "../../../components/Layout";
import { SingleNoteQuery } from "../../../graphql/queries";
import { INote } from "../../../types/types";
import { fmtSS } from "../../../utils/fmtSS";

interface IData {
  note: INote;
}

export default function SingleNote() {
  const router = useRouter();
  const noteId = Number(router.query.id);

  const { data, loading, error } = useQuery<IData>(SingleNoteQuery, {
    variables: { noteId },
  });

  useEffect(() => {
    if (error && !loading) {
      router.push("/");
    }
  }, [loading, error]);

  return (
    <Layout title="Single note">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {data.note.title}
              </h1>
              <div className="flex items-center gap-4">
                <DeleteNoteBtn noteId={noteId} />
                <button
                  className="px-4 py-1 text-white rounded bg-primary"
                  onClick={() => router.push(`/note/${data.note.id}/update`)}
                >
                  Update
                </button>
              </div>
            </div>
            <h3 className="mt-1 text-lg text-gray-800">{data.note.subtitle}</h3>
            <span className="text-sm">{fmtSS(data.note.createdAt)}</span>
            <p className="mt-6 text-gray-800">{data.note.body}</p>
            {data.note.category && (
              <p className="mt-8">#{data.note.category}</p>
            )}
          </div>
        )
      )}
    </Layout>
  );
}
