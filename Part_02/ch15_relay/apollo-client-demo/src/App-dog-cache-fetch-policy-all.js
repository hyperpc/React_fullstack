import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { useState } from 'react';
import { DogPhoto } from './components/Dog/DogPhoto';
import { Dogs } from './components/Dog/Dogs';

function App() {
    const directionalLink = new RetryLink({
        /** 
         * default configure 
        */
        /*
        attempts:{
            max:5,
            retryIf:(error, _operation)=>!!error
        },
        delay:{
            initial:300,
            max:Infinity,
            jitter:true
        }
        */
       /**
        * custome strategies
        * https://www.apollographql.com/docs/react/api/link/apollo-link-retry/
        * @param {*} count 
        * @param {*} operation 
        * @param {*} error 
        * @returns 
        */
        attempts:(count, operation, error) =>{
            return !!error && operation.operationName !== 'sepecialCase';
        },
        delay:(count, operation, error)=>{
            return count*1000*Math.random();
        }
    }).split(
        (operation)=>operation.getContext().version===1,
        new HttpLink({uri:"https://71z1g.sse.codesandbox.io/"}),
        new HttpLink({uri:"https://71z1g.sse.codesandbox.io/"})
    );

    const client = new ApolloClient({
        /* url of GraphQL server */        
        //uri: 'https://71z1g.sse.codesandbox.io/', 

        /* an instance of InMemoryCache, 
        which ApolloClient uses to cache query results after fetching them */
        cache: new InMemoryCache(),

        link:directionalLink,
        
        defaultOptions:{
            watchQuery:{
                nextFetchPolicy(
                    currentFetchPolicy,
                    {
                        // Either "after-fetch" or "variables-changed", indicating why the
                        // nextFetchPolicy function was invoked.
                        reason,
                        // The rest of the options (currentFetchPolicy === options.fetchPolicy).
                        options,
                        // The original value of options.fetchPolicy, before nextFetchPolicy was
                        // applied for the first time.
                        initialFetchPolicy,
                        // The ObservableQuery associated with this client.watchQuery call.
                        observable
                    }
                ){
                    // When variables change, the default behavior is to reset
                    // options.fetchPolicy to context.initialPolicy. If you omit this logic,
                    // your nextFetchPolicy function can override this default behavior to
                    // prevent options.fetchPolicy from changing in this case.
                    if(reason==='variables-changed'){
                        return initialFetchPolicy;
                    }

                    if(currentFetchPolicy==='network-only' ||
                    currentFetchPolicy==='cache-and-network'){
                        //Demote the network policies (except "no-cache") to "cache-first"
                        // after the first request.
                        return 'cache-first'
                    }

                    // Leave all other fetch policies unchanged.
                    return currentFetchPolicy;
                }
            }
        }
    });

    const [selectedDog, setSelectedDog] = useState(null);

    function onDogSelected({target}){
        setSelectedDog(target.value);
    }

    return (
    <ApolloProvider client={client}>
        <div>
            <h2>My second Apollo app 🚀</h2>
            {selectedDog && <DogPhoto breed={selectedDog} /> }
            <Dogs onDogSelected={onDogSelected}/>
        </div>
    </ApolloProvider>
  );
}


export default App;
