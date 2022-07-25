import { gql, useQuery } from '@apollo/client';
//import { useParams } from 'react-router-dom';
import { AuthorItem } from './AuthorItem';
import '../styles/AuthorPage.css';

export function AuthorsPage(){
    const { data, loading, error } = useQuery(GET_ALL_AUTHORS);
    console.log(data);
    console.log(loading);
    console.log(error);

    return (
        <div className="sixteen wide column">
            <h1>{/*{
                    !bookData.authorCount ? `Author`:
                    (bookData.authorCount > 1 ? 
                    `${bookData.authorCount} Authors` 
                    : `${bookData.authorCount} Author`)
                } of Book({bookData.name})*/}
                Authors
            </h1>
            <div className="ui grid centered">
                {data?.getAllAuthors?.map((author)=>{
                    return (<AuthorItem key={author.author_id} author={author} />);}
                )}
            </div>
        </div>
    );
}

const GET_ALL_AUTHORS=gql`
query GetAllAuthors {
    getAllAuthors {
        author_id,
        name,
        bio,
        avatarUrl,
        avatarContent,
        bookCount
    }
}
`;