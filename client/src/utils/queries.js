import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getMe {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

// CHECK LATER IF IT IS NECESSARY
export const QUERY_BOOKS = gql`
    query getBooks {
        books {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`
