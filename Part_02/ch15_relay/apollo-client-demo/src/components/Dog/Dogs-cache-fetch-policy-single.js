import { gql, useQuery } from '@apollo/client';

const GET_DOGS=gql`
query GetDogs {
    dogs {
        id
        breed
    }
}
`;

export function Dogs({onDogSelected}){
    const { loading, error, data } = useQuery(GET_DOGS);
    if(loading) return 'Loading...';
    if(error) return `Dogs-Error: ${error.message}`;
    return (
        <select name='dog' onChange={onDogSelected}>
            {data.dogs.map((dog)=>(
                <option value={dog.breed} key={dog.id}>{dog.breed}</option>
            ))}
        </select>
    );
}