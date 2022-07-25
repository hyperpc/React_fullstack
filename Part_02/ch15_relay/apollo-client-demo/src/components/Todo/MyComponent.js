import {gql, useMutation, userMutation} from '@apollo/client';

// define mutation
const INCREMENT_COUNTER=gql`
#Increment a back-end counter and gets its resulting value
mutation IncrementCounter{
    currentValue
}
`;

export function MyComponent(){
    // Pass mutation to useMutation
    const [mutateFunction, {data, loading, error}] = useMutation(INCREMENT_COUNTER);

    if(loading) return 'Loading...';
    if(error) return error;

    return (
        <div>
            <button onClick={mutateFunction}>{data}</button>
        </div>
    );
}