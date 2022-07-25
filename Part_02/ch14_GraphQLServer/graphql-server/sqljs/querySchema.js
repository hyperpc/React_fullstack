import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './db/types';
import { resolvers } from './db/resolvers';

/*
class Node{
    constructor(id, name){
        this.id=id;
        this.name=name;
    }
}
*/

export const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
