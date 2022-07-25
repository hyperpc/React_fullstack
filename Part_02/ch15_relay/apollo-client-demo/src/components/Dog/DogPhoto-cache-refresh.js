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
    /*
    // 1. default cache via useQuery()
    const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
        variables:{breed}
    });
    */

    // 2. polling interval to refresh cache at a specified interval
    const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
        variables:{breed},
        pollInterval: 500
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
