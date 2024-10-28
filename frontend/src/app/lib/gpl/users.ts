import gql from 'graphql-tag';

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      roles {
        id
        role
      }
    }
  }
`;
