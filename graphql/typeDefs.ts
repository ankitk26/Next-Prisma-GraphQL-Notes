import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    notes: [Note]
    note(id: Int!): Note
    me: User
  }

  type Note {
    id: Int!
    title: String!
    subtitle: String
    createdAt: String
    body: String!
    category: String
    userId: Int
    user: User
  }

  type User {
    id: Int!
    email: String!
  }

  input NoteInput {
    title: String!
    subtitle: String
    body: String!
    category: String
  }

  input UserInput {
    email: String!
    password: String!
  }

  type Mutation {
    addNote(noteInput: NoteInput): Note
    deleteNote(id: Int!): Note
    updateNote(id: Int!, noteInput: NoteInput): Note
    loginUser(userInput: UserInput): User
    registerUser(userInput: UserInput): User
    logout: String
  }
`;
