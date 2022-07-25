import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
//import { sequelize } from '../db/tables-define.js';
//import { QueryTypes } from 'sequelize'; 

export const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});

/*
export async function getUser(token){
    const users = await sequelize.query('SELECT * FROM users WHERE name=:token',{
        replacements:{token:token},
        type:QueryTypes.SELECT
    });
    //console.log(users);
    //console.log(users[0].name);
    if(users && users.length>0){
        const user = users[0];
        return {user_id:user.user_id, name:user.name, about:user.about};
    }
    return null;
}
*/