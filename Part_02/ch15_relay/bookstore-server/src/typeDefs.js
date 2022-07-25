import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    type Result {
        isError: Boolean!,
        message: String!
    }

    type Author {
        author_id: String!,
        name: String!,
        bio: String,
        avatarUrl: String
    }

    type AuthorResponse {
        author_id: String!,
        name: String!,
        bio: String,
        avatarUrl: String,
        avatarContent: String,
        bookCount: Int
    }

    type Book {
        book_id: String!,
        name: String!,
        slug: String,
        tagline: String,
        coverUrl: String,
        description: String
    }

    type BookResponse {
        book_id: String!,
        name: String!,
        slug: String,
        tagline: String,
        coverUrl: String,
        coverContent: String,
        description: String,
        authorCount: Int
    }

    type Authorship {
        authorship_id: String!,
        author_id: String!,
        book_id: String!
    }

    type Query{
        getAllAuthors: [AuthorResponse]
        ,getAuthorById(authorId:String!): AuthorResponse
        ,getAuthorsByIds(ids:[String]):[AuthorResponse]

        ,getAllBooks: [BookResponse]
        ,getAllBooksInPagination(limit:Int, offset: Int): [BookResponse]
        ,getBookById(bookId:String!): BookResponse
        ,getBooksByIds(ids:[String]):[BookResponse]

        ,getAllAuthorships: [Authorship]

        ,getBooksByAuthorIdInPagination(authorId:String!, limit:Int, offset: Int):[BookResponse]
        ,getAuthorsByBookIdInPagination(bookId:String!, limit:Int, offset: Int):[AuthorResponse]
    }

    type Mutation{
        updateAuthor(authorId:String!, name:String!, bio:String, avatarUrl:String):Result
        ,updateBook(bookId:String!, name:String!, slug:String, tagline:String, coverUrl:String, description:String):Result
        ,updateAuthorship(authorshipId:String!, authorId:String!, bookId:String!):Result
    }
`;
