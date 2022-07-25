import { gql, useQuery } from '@apollo/client';
import { BookItem } from './BookItem';

export function BooksPage(){
    const { data } = useQuery(GET_BOOKS_IN_PAGINATION,{
        variables:{
            limit: 5,
            offset: 0
        }
    });

    /*
    let books1 = '';
    if(loading) books1 = 'Loading...';
    if(error) books1 = <p>Error :(</p>;
    */

    //console.log(data);

    return (
        <div className="sixteen wide column">
            <h1>JavaScript Books</h1>
            <div className="ui grid centered">
                {data?.getAllBooksInPagination?.map((book)=>{
                    return (<BookItem key={book.book_id} book={book} />);}
                )}                
            </div>
        </div>
    );
}

const GET_BOOKS_IN_PAGINATION=gql`
query GetAllBooksInPagination($limit: Int, $offset: Int) {
    getAllBooksInPagination(limit: $limit, offset: $offset) {
        book_id
        name
        slug
        tagline
        coverUrl
        coverContent
        description
        authorCount
    }
}
`;