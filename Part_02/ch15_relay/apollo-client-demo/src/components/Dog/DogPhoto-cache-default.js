import { gql, useQuery } from '@apollo/client';

const GET_DOG_PHOTO=gql`
query Dog($breed:String!){
    dog(breed:$breed){
        id
        displayImage
    }
}
`;

export function DogPhoto({breed}){
    const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
        variables:{breed}
    });
    
    if(loading) return 'Loading photo...';
    if(error) return `DogPhoto-Error: ${error.message}`;

    return (
        <div>
            <div>
                <img alt="Dog" style={{height:100, width:100}}
                    src={data.dog.displayImage} />
            </div>
        </div>
    );
}
