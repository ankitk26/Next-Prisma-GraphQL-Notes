import Head from "next/head";
import Navbar from "./Navbar";

interface IProps {
  children: any;
  title: string;
}

export default function Layout({ children, title }: IProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <main className="w-full p-3 mx-auto mt-8 md:p-0 md:w-11/12">
        {children}
      </main>
    </>
  );
}
