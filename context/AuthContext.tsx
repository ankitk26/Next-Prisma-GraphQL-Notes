import {
  ApolloError,
  OperationVariables,
  QueryLazyOptions,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { GetNotesQuery, GetUserQuery } from "../graphql/queries";
import { IUser } from "../types/types";

interface IContextProps {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  authLoading: boolean;
  authError: string;
  loadUser: (options?: QueryLazyOptions<OperationVariables>) => void;
}

const AuthContext = createContext<IContextProps>(null);

interface UserData {
  me: IUser;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<IUser>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string>(null);

  useEffect(() => loadUser(), []);

  const [loadUser, { loading, data }] = useLazyQuery<UserData>(GetUserQuery, {
    onCompleted: () => {
      console.log(data);
      setUser(data.me);
      setAuthLoading(loading);
    },
    onError: (err) => {
      setAuthError(err.message);
    },
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, authLoading, loadUser, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
