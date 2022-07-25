import { gql, NetworkStatus, useLazyQuery } from '@apollo/client';
//import { onError } from '@apollo/client/link/error';

const GET_DOG_PHOTO=gql`
query Dog($breed:String!){
    dog(breed:$breed){
        id
        displayImage
    }
}
`;

/*
// Log any GraphQL errors or network error that occurred
const DogErrorLink=(graphQLErrors, networkError)=>onError((graphQLErrors, networkError)=>{
    if(graphQLErrors){
        return (
            <pre key={0}>
                Bad: {" "}
                {OnGraphQLError(graphQLErrors)}
            </pre>
        );
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if(networkError){
        return (
            <pre key={0}>
                Bad: {" "}
                {OnNetworkError(networkError)}
            </pre>
        );
    }
});
*/

function OnGraphQLError(graphQLErrors){
    let result='';
    if(graphQLErrors){
        result=graphQLErrors.forEach(({message, locations, path}, i)=>{
            console.log(`[OnGraphQLError].[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            return (
                <span key={i}>{message}</span>
            );
        });
    }
    return result;
};
function OnNetworkError(networkError){
    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    let result='';
    if(networkError){
        console.log(`[OnNetworkError].[Network error]: ${networkError}`);
        result=<span key="1">{`[OnNetworkError].[Network error]: ${networkError}`}</span>;
    }
    return result;
};

export function DogPhoto({breed}){
    /*
    // 1. default cache via useQuery()
    const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
        variables:{breed}
    });
    */

    /*
    // 2. polling interval to refresh cache at a specified interval
    const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
        variables:{breed},
        pollInterval: 500
    });
     */

    /*
    // 3. Refresh query results in response to a particular user action
    const { loading, error, data, refetch, networkStatus } = useQuery(GET_DOG_PHOTO, {
        variables:{breed},
        notifyOnNetworkStatusChange:true,
        errorPolicy:'all'
    });
    */

    // 4. lazy query dog photo
    const [getDog, {loading, error, data, networkStatus }] = useLazyQuery(GET_DOG_PHOTO,{
        onError({graphQLErrors, networkError}){
            if(graphQLErrors){
                graphQLErrors.forEach(({message, location, path})=>{
                    console.log(`[useLazyQuery].[GraphQL error]: Message: ${message}, Location: ${location},  Path: ${path}`);
                });
            }

            if(networkError){
                console.log(`[useLazyQuery].[Network error]: ${networkError}`);
            }
        }
    });

    if(networkStatus===NetworkStatus.refetch) return 'Refetching...'
    if(loading) return 'Loading photo...';
    //if(error) return `DogPhoto-Error: ${error.message}`;
    let graphQLErrors = null;
    if(error && error.graphQLErrors){
        graphQLErrors =OnGraphQLError(error.graphQLErrors);
    }
    let networkError = null;
    if(error && error.networkError){
        networkError = OnNetworkError(error.networkError);
    }

    return (
        <div>
            <div>
                <img alt="Dog" style={{height:100, width:100}}
                    src={data?.dog.displayImage} />
            </div>
            <pre>
            {graphQLErrors}
            {networkError}
            </pre>
            <button onClick={()=>getDog({variables:{breed:'akita'}})}>Get Dog Photo!</button>
            <button onClick={()=>getDog({variables:{breed:'bulldog'}})}>Get bulldog Photo!</button>
        </div>
    );
}
