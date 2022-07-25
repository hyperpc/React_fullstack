import express from 'express';
import { createServer } from 'http';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema, getUser } from './querySchema.js';

(async function(){
    const app = express();
    const httpServer = createServer(app);

    let wsServer;
    const server = new ApolloServer({
        schema,
        context:async ({req})=>{
            const token = req.headers.authorization||'';
            const user = await getUser(token);
            if(!user){
                throw new AuthenticationError('you must be logged in');
            }
            //console.log("context: ");
            //console.log(user);
            return user;
        },
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
