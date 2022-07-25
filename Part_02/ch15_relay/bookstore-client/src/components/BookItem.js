import { FancyBook } from './FancyBook';
import { NavLink } from 'react-router-dom';
//import { AuthorsPage } from './AuthorsPage';
import '../styles/BookItem.css';

export function BookItem({book}){
    // route parameters:
    //const params = useParams();
    //console.log(params);

    //console.log(book);

    return (
        <div className="bookItem">
            <FancyBook book={book} />
            {/*<img src={book.coverContent} alt={`Book Cover of ${book.name}`} />*/}
            <div className="bookMeta">
                <div className="authors">
                    <NavLink to={`/books/${book.book_id}/authors`}>
                    {book.authorCount}
                    {book.authorCount > 1 ? ' Authors' : ' Author'}
                    </NavLink>
                </div>
                <h2>{book.name}</h2>
                <div className="tagline">{book.tagline}</div>
                <div className="description">{book.description}</div>
            </div>
        </div>
    );
}