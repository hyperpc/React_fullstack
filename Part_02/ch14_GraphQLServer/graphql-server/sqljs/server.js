
import express from 'express';
import { createServer } from 'http';
//import { execute, subscribe } from 'graphql';
//import { makeExecutableSchema } from '@graphql-tools/schema/esm/makeExecutableSchema';
//import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './querySchema.js';


(async function(){
    const app = express();
    const httpServer = createServer(app);

    let wsServer;
    const server = new ApolloServer({
        schema,
        plugins:[{
            async serverWillStart(){
                return {
                    async drainServer(){
                        //wsServer.close();
                        await serverCleanup.dispose();
                    }
                }
            }
        }]
    })

    wsServer = new WebSocketServer({
        server: httpServer,
        path:"/graphql"
    });

    const serverCleanup = useServer({schema}, wsServer);

    await server.start();
    server.applyMiddleware({app});

    const PORT=4000;
    httpServer.listen(PORT, ()=>{
        console.log(`My GraphQL (apollo express) server is now running on http://localhost:${PORT}/graphql`)
    });
})();