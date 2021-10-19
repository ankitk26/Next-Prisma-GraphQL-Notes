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
  email: string;
}
