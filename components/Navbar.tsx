import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-primary">
      <div className="flex items-center justify-between w-11/12 p-3 mx-auto">
        <Link href="/">
          <a>
            <h1 className="text-2xl text-white">Noted!</h1>
          </a>
        </Link>

        <div className="flex items-center gap-8">
          {user ? (
            <>
              <Link href="/add">
                <a className="text-white">Add note</a>
              </Link>
              <Link href="/logout">
                <a className="text-white">Logout</a>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <a className="text-white">Login</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
