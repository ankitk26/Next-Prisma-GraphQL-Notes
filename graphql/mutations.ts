import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation LoginUser($userInput: UserInput) {
    loginUser(userInput: $userInput) {
      id
      email
    }
  }
`;

export const RegisterMutation = gql`
  mutation RegisterUser($userInput: UserInput) {
    registerUser(userInput: $userInput) {
      id
      email
    }
  }
`;

export const LogoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

export const AddNoteMutation = gql`
  mutation AddNote($noteInput: NoteInput) {
    addNote(noteInput: $noteInput) {
      id
      title
      subtitle
      createdAt
      body
      category
      userId
    }
  }
`;

export const DeleteNoteMutation = gql`
  mutation DeleteNote($noteId: Int!) {
    deleteNote(id: $noteId) {
      id
      title
      subtitle
      body
      category
      createdAt
    }
  }
`;

export const UpdateNoteMutation = gql`
  mutation UpdateNote($noteId: Int!, $noteInput: NoteInput) {
    updateNote(id: $noteId, noteInput: $noteInput) {
      id
      title
      subtitle
      body
      category
      createdAt
    }
  }
`;
