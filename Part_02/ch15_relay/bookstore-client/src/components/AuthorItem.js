import { gql, useQuery } from '@apollo/client';
import { BookItem } from './BookItem';

export function AuthorItem({author}){
    const { data } = useQuery(GET_BOOKS_BY_AUTHOR_ID_IN_PAGINATION,{
        variables:{
            authorId:author.author_id,
            limit: 5,
            offset: 0
        }
    });
    console.log(data);

    return (
      <div className="authorPage bookPage sixteen wide column">
        <div className="spacer row" />

        <div className="ui divided items">
          <div className="item">
            <div className="ui">
              <img
                src={author.avatarContent}
                alt={author.name}
                className="ui medium rounded bordered image"
              />
            </div>
            <div className="content">
              <div className="header authorName">
                <h1>{author.name}</h1>
                <div className="extra">
                  <div className="ui label">
                    {author.bookCount}
                    {author.bookCount > 1 ? ' Books' : ' Book'}
                  </div>
                </div>
              </div>
              <div className="description">
                <p> {author.bio} </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sixteen wide column">
          <h1>{author.name}&rsquo;s {author.bookCount > 1 ? ' Books' : ' Book'}</h1>
          <div className="ui grid centered">
            {data?.getBooksByAuthorIdInPagination?.map((book)=>{
                return (<BookItem key={book.book_id} book={book} />);}
            )}    
          </div>
        </div>
      </div>
    );
}


const GET_BOOKS_BY_AUTHOR_ID_IN_PAGINATION=gql`
query GetBooksByAuthorIdInPagination($authorId: String, $limit: Int, $offset: Int) {
    getBooksByAuthorIdInPagination(authorId:$bookId, limit:$limit, offset:$offset) {
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
