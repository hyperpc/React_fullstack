import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AddTodo } from "./components/Todo/AddTodo";
import { ReadCachedTodo } from "./components/Todo/ReadCachedTodo";
import { Todos } from "./components/Todo/Todos";
import { WriteCachedTodo } from "./components/Todo/WriteCachedTodo";

function App(){
    let action =0;
    return (
        <ApolloProvider client={client}>
            <div>
                <h2>My third Apollo app 🚀</h2>
                <AddTodo />
                <Todos />
                <button onClick={e=>{
                    e.preventDefault();
                    if(action===0){ return <ReadCachedTodo />}
                    if(action===1){ return <WriteCachedTodo />}
                    action=action===0?1:0;                    
                }}>
                    Read/Write cached todos
                </button>
            </div>
        </ApolloProvider>
    );
}

const client = new ApolloClient({
    uri:'https://sxewr.sse.codesandbox.io/',
    cache:new InMemoryCache()
});

/*
function ReadAndWriteCache(action=0){
    if(action===0){
        action = action +1;
        return <ReadCachedTodo client={client} />
    }

    if(action===1){
        action = action-1;
        return <WriteCachedTodo client={client} />
    }
}
*/

export default App;