import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description:'The root query',
    fields:{
        viewer:{
            type:GraphQLString,
            resolve(){
                return 'viewer!';
            }
        }
    }
});

 