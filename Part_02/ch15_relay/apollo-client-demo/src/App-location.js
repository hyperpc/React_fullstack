import { DisplayLocations } from './components/DisplayLocations';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  /* url of GraphQL server */
  uri: 'https://flyby-gateway.herokuapp.com/', 
  /* an instance of InMemoryCache, 
  which ApolloClient uses to cache query results after fetching them */
  cache: new InMemoryCache(), 
});

/**
 * Test to send a query with plain javascript, 
*/
/*
client.query({
  query:gql`
  query GetLocation{
    locations{
      id
      name
      description
      photo
    }
  }`
}).then((result)=>console.log(result));
*/

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <DisplayLocations />
      </div>
    </ApolloProvider>
  );
}


export default App;
