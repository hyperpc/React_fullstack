import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { AuthorItem } from './AuthorItem';
import '../styles/AuthorPage.css';

export function AuthorDetail(){
    // route parameters:
    const params = useParams();
    console.log(params.book_id);

    const { data, loading, error } = useQuery(GET_AUTHORS_BY_BOOK_ID_IN_PAGINATION,{
        variables:{
            bookId:params.book_id,
            //limit: 10,
            //offset: 0
        }
    });
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
                Author of book
            </h1>
            <div className="ui grid centered">
                {data?.getAuthorsByBookIdInPagination?.map((author)=>{
                    return (<AuthorItem key={author.author_id} author={author} />);}
                )}
            </div>
        </div>
    );
}

const GET_AUTHORS_BY_BOOK_ID_IN_PAGINATION=gql`
query GetAuthorsByBookIdInPagination($bookId: String, $limit: Int, $offset: Int) {
    getAuthorsByBookIdInPagination(bookId:$bookId, limit:$limit, offset:$offset) {
        author_id,
        name,
        bio,
        avatarUrl,
        avatarContent,
        bookCount
    }
}
`;