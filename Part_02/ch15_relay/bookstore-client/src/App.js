import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
//import { NavLink, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { BooksPage } from './components/BooksPage';
import { BookItem } from './components/BookItem';
import { AuthorsPage } from './components/AuthorsPage';
import { AuthorItem } from './components/AuthorItem';

function App() {
  
  const client = new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache:new InMemoryCache()
    ,name:'Bookstore Demo'
    ,version:'0.1'
  });

  return (
    <ApolloProvider client={client}>
      <div className='ui grid'>
        <TopBar />
        <div className='ui grid container'>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:book_id" element={<BookItem />} />
            <Route path="/books/:book_id/authors" element={<AuthorsPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/:author_id" element={<AuthorItem />} />
          </Routes>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
