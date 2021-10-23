export interface INote {
  id: number;
  title: string;
  subtitle?: string;
  createdAt?: string;
  body: string;
  category?: string;
  userId?: number;
  user?: IUser;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface INoteInput {
  title: "";
  subtitle: "";
  body: "";
  category: "";
}
