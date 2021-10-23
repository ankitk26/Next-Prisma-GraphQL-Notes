import { gql } from "@apollo/client";

export const GetUserQuery = gql`
  query GetUser {
    me {
      id
      email
      name
    }
  }
`;

export const GetNotesQuery = gql`
  query AllNotes {
    notes {
      id
      title
      subtitle
      body
      category
      createdAt
    }
  }
`;

export const SingleNoteQuery = gql`
  query SingleNote($noteId: Int!) {
    note(id: $noteId) {
      id
      title
      subtitle
      createdAt
      body
      category
    }
  }
`;
