import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-primary">
      <div className="flex items-center justify-between w-full p-3 mx-auto md:w-11/12">
        <Link href="/">
          <a>
            <h1 className="text-xl text-white md:text-2xl">Noted!</h1>
          </a>
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          {user ? (
            <>
              <span className="mr-5 text-sm text-white md:text-base">
                Welcome {user.name}
              </span>
              <Link href="/add">
                <a className="hidden text-sm text-white md:block md:text-base">
                  Add note
                </a>
              </Link>
              <Link href="/logout">
                <a className="text-sm text-white md:text-base">Logout</a>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <a className="text-sm text-white md:text-base">Login</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
