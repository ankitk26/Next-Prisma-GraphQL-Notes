import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import DeleteNoteBtn from "../../../components/DeleteNoteBtn";
import Layout from "../../../components/Layout";
import { useAuth } from "../../../context/AuthContext";
import { SingleNoteQuery } from "../../../graphql/queries";
import { INote } from "../../../types/types";
import { fmtSS } from "../../../utils/fmtSS";

interface IData {
  note: INote;
}

export default function SingleNote() {
  const router = useRouter();
  const noteId = Number(router.query.id);
  const { user, authLoading } = useAuth();

  const { data, loading, error } = useQuery<IData>(SingleNoteQuery, {
    variables: { noteId },
  });

  useEffect(() => {
    if (!user && !authLoading) {
      router.push("/login");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (error) {
      router.push("/");
    }
  }, [error]);

  return (
    <Layout title="Single note">
      {user &&
        (loading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {data.note.title}
                </h1>
                <div className="items-center hidden gap-4 md:flex">
                  <DeleteNoteBtn noteId={noteId} />
                  <button
                    className="btn-outlined"
                    onClick={() => router.push(`/note/${data.note.id}/update`)}
                  >
                    Update
                  </button>
                </div>
              </div>
              <h3 className="mt-1 text-lg text-gray-800">
                {data.note.subtitle}
              </h3>
              <span className="text-sm">{fmtSS(data.note.createdAt)}</span>
              <p className="mt-6 text-gray-800">{data.note.body}</p>
              {data.note.category && (
                <p className="mt-8 italic">#{data.note.category}</p>
              )}
              <div className="flex flex-col items-center gap-4 mt-5 md:hidden">
                <DeleteNoteBtn noteId={noteId} />
                <button
                  className="w-full btn-outlined"
                  onClick={() => router.push(`/note/${data.note.id}/update`)}
                >
                  Update
                </button>
              </div>
            </div>
          )
        ))}
    </Layout>
  );
}
