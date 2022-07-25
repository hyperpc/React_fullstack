import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    type Result{
        isError: Boolean!,
        message: String!
    }

    type User {
        user_id: Int!,
        name: String!,
        about: String
    }

    type Friendship{
        user_id: Int!,
        friend_user_id: Int!,
        level: Int!
    }

    type Post{
        postId: Int!,
        user_id: Int!,
        body: String!,
        level: Int!,
        created_at: String
    }

    type PostResponse{
        postId: Int!,
        user_id: Int!,
        body: String!,
        level: Int!,
        levelName: String,
        created_at: String
    }

    type Query{
        getAllUsers: [User]
        ,getUserById(userId:Int!): User
        ,getUsersByIds(ids:[Int]):[User]
        ,getMyFriendshipInOrder:[Friendship]
        ,getMyPostsInPagination:[PostResponse]
        ,getFriendsPostsInPagination:[PostResponse]
    }

    type Mutation{
        addUser(userId:Int!, name:String!, about:String):Result
        ,updateUser(userId:Int!, name:String!, about:String):Result
        ,deleteUser(userId:Int!): Result
        ,restoreUser(userId:Int!):Result
        ,deleteUsers(ids:[Int]):Result
        ,addPost(postId:Int!, body:String!, level:Int!):Result
    }
`;
