import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import NoteSkeleton from "../components/NoteSkeleton";
import NotesList from "../components/NotesList";
import { GetNotesQuery } from "../graphql/queries";

export default function Home() {
  const { data, loading, error } = useQuery(GetNotesQuery);
  const router = useRouter();

  useEffect(() => {
    if (error && !loading) {
      router.push("/login");
    }
  }, [loading, error]);

  return (
    <Layout title="Home page">
      {error && <p>{error.message}</p>}
      {loading ? <NoteSkeleton /> : data && <NotesList notes={data.notes} />}
    </Layout>
  );
}
