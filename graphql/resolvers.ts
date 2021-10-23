import { AuthenticationError, UserInputError } from "apollo-server-errors";
import { compare, genSalt, hash } from "bcryptjs";
import { setLoginSession } from "../lib/auth";
import { removeTokenCookie } from "../lib/auth-cookies";
import { INote } from "../types/types";
import { Context } from "./context";

interface IUserInput {
  userInput: {
    email: string;
    name: string;
    password: string;
  };
}

export const resolvers = {
  Query: {
    notes: async (_, __, ctx: Context) => {
      try {
        return ctx.prisma.note.findMany({ where: { userId: ctx.user.id } });
      } catch (err) {
        throw new AuthenticationError("Not authenticated");
      }
    },

    note: async (_parent: INote, { id }: { id: number }, ctx: Context) => {
      try {
        const note = await ctx.prisma.note.findUnique({ where: { id } });
        if (note.userId === ctx.user.id) {
          return note;
        } else {
          throw new AuthenticationError("Not authorized");
        }
      } catch (err) {
        throw new AuthenticationError("Not authorized");
      }
    },

    me: async (_parent, _args, ctx: Context) => {
      try {
        return ctx.user;
      } catch (err) {
        throw new AuthenticationError("Invalid token, log in again");
      }
    },
  },

  Mutation: {
    addNote: async (_parent, { noteInput }, ctx: Context) => {
      try {
        const newNote = await ctx.prisma.note.create({
          data: { ...noteInput, userId: ctx.user.id },
        });
        return newNote;
      } catch (err) {
        throw new AuthenticationError("Not authenticated");
      }
    },

    deleteNote: async (_parent, { id }, ctx: Context) => {
      try {
        const note = await ctx.prisma.note.findUnique({ where: { id } });
        if (note.userId === ctx.user.id) {
          return ctx.prisma.note.delete({ where: { id } });
        }
      } catch (err) {
        throw new AuthenticationError("Not authenticated");
      }
    },

    updateNote: async (_parent, { id, noteInput }, ctx: Context) => {
      try {
        const note = await ctx.prisma.note.findUnique({ where: { id } });
        if (note.userId === ctx.user.id) {
          return ctx.prisma.note.update({
            where: { id },
            data: { ...noteInput },
          });
        }
      } catch (err) {
        throw new AuthenticationError("Not authenticated");
      }
    },

    registerUser: async (_parent, { userInput }: IUserInput, ctx: Context) => {
      const { email, name, password } = userInput;

      // Check if user already exists
      const user = await ctx.prisma.user.findFirst({ where: { email } });
      if (user) {
        throw new UserInputError("User with given email already exists");
      }

      // If new user then add user to database
      // Generate salt to hash the password
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const newUser = await ctx.prisma.user.create({
        data: { email, name, password: hashedPassword },
      });
      return newUser;
    },

    loginUser: async (_parent, { userInput }: IUserInput, ctx: Context) => {
      const { email, password } = userInput;

      // Check if user exists
      const user = await ctx.prisma.user.findFirst({ where: { email } });
      if (!user) throw new AuthenticationError("Account not found");

      // Compare passwords
      const isMatched = await compare(password, user.password);
      if (!isMatched) throw new AuthenticationError("Incorrect password");

      // Create payload for token and set cookie
      const payload = { id: user.id, email: user.email, name: user.name };
      await setLoginSession(ctx.res, payload);
      return payload;
    },

    logout: (_parent, _args, ctx: Context) => {
      removeTokenCookie(ctx.res);
      return "Logged out";
    },
  },
};
