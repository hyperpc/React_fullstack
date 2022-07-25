import { gql } from 'apollo-server-core';


export const typeDefs = gql`
    type NodeInterface{
        id:Integer!
    }

    type UserType{
        id:Integer!,
        name:String!,
        about:String
    }

    type PostType{
        id:Integer!,
        createdAt:String!,
        body:String!
    }
`;