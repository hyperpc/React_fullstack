import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
//import { gql } from "@apollo/client";

export function ReadCachedTodo(){

    const client = new ApolloClient({
        uri:'https://sxewr.sse.codesandbox.io/',
        cache:new InMemoryCache()
    });

    // Fetch the cached to-do item with ID 5
    const {todo}=client.readQuery({
        query:READ_TODO,
        /**
         * Provide any required variables here.  
         * Variables of mismatched types will return `null`.  
        */
        variables:{
            id:'rk6PlD6ic'
        }
    });

    console.log(todo);

    return (
        <p>{todo}</p>
    );
}

const READ_TODO=gql`
query ReadTodo($id:ID!){
    todo(id:$id){
        id
        text
        completed
    }
}
`;