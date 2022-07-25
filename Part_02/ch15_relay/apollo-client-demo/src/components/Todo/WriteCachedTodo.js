import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
//import { gql } from "@apollo/client";

export function WriteCachedTodo(){
    const client = new ApolloClient({
        uri:'https://sxewr.sse.codesandbox.io/',
        cache:new InMemoryCache()
    });

    // to write data to cache in a shape that matches a GraphQL query
    const {todo}=client.writeQuery({
        query:WRITE_TODO,
        /**
         * Provide any required variables here.  
         * Variables of mismatched types will return `null`.  
        */
        variables:{
            id:'rk6PlD6ic'
        },
        /**
         * - Any changes you make to cached data with writeQuery are not pushed to your GraphQL server.
         *   If you reload your environment, these changes disappear.
         * - The shape of your query is not enforced by your GraphQL server's schema:
         *   - The query can include fields that are not present in your schema.
         *   - You can (but usually shouldn't) provide values for schema fields that are invalid according to your schema.
         */
        data:{
            todo:{
                __typename:'Todo',
                id:'rk6PlD6ic',
                text:'Buy grapes 🍇',
                completed:false
            }
        }
    });

    console.log(todo);

    return (
        <p>{todo}</p>
    );
}

const WRITE_TODO=gql`
query WriteTodo($id:ID!){
    todo(id:$id){
        id
        text
        completed
    }
}
`;