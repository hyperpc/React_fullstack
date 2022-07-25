import { gql, useMutation } from '@apollo/client';

const ADD_TODO=gql`
mutation AddTodo($type:String!){
    addTodo(type:$type){
        id
        type
    }
}
`;

const GET_TODOS=gql`
{
    todos{
        id
        type
    }
}
`;

export function AddTodo(){
    let input;
    const [addTodo, {data, loading, error}] = useMutation(ADD_TODO,{
        variables:{
            type:'this is a placeholder'
        },
        /* update： to apply manual changes to the cached data after a mutation */
        update(
            cache,
            {
                data:{addTodo}
            }
        ){
            cache.modify({
                fields:{
                    todos(existingTodos=[]){
                        const newTodoRef = cache.writeFragment({
                            data:addTodo,
                            fragment:gql`
                                fragment NewTodo on Todo{
                                    id
                                    type
                                }
                            `
                        });
                        return existingTodos.concat(newTodoRef);
                    }
                }
            });
        },
        /* refetchQueries: to refetch certain queries after a particular mutation */
        refetchQueries:[
            /* */
            {query: GET_TODOS}, // DocumentNode object parsed with gql
            'GetTodos'          // Query name
           
           /*
           "ReallyImportantQuery"
           */
        ],
        onQueryUpdated(observableQuery){
            // Define any custom logic for determining whether to refetch

            // If ReallyImportantQuery is active, it will be passed to onQueryUpdated.
            // If no query with that name is active, a warning will be logged.
            if (shouldRefetchQuery(observableQuery)) {
                return observableQuery.refetch();
            }
        }
    });

    if(loading) return 'Submitting...';
    if(error) return `Submission error: ${error.message}`;
    console.log("data: ", data);

    return (
        <div>
            <form onSubmit={e=>{
                e.preventDefault();
                addTodo({variables:{type:input.value}});
                input.value='';
            }}>
                <input ref={node=>{input=node;}} />
                <button type='submit'>Add Todo</button>
            </form>
        </div>
    );
}

function shouldRefetchQuery(queryName){
    const importantQueries = ["ReallyImportantQuery","GetTodos"];    
    return importantQueries.indexOf(queryName)>-1;
}