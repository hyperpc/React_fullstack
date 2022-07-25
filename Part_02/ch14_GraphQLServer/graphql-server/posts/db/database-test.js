import { Op } from 'sequelize'; 
import { sequelize, User, Friendship, Post } from './tables.js';

/*
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./graph-db.sqlite',
    logging:(...msg)=>console.log(msg)
});
*/

async function TestDB(){
    
    await sequelize.authenticate()
    .then(()=>{
        console.log(">> Connection has been established successfully.")
    }).catch(err=>{
        console.log('>> Unable to connect to the database:', err);
    });

    console.log(">> User.findOne(1)");
    const user = await User.findOne({
        where:{
            user_id:{
                [Op.eq]:1
            }
        }
    });

    console.log(JSON.stringify(user.dataValues));
    console.log(user.dataValues);
    console.log(user.dataValues.name);

    console.log(">> User.findAll()");
    const userList = await User.findAll();
    //console.log(userList);
    if(userList){
        userList.map(u=>{
            console.log(u.toJSON());
            //console.log(JSON.stringify(u.dataValues));
            console.log(u.dataValues.name);
        });
    }

    console.log(">> Friendship.findAll()");
    const friendshipList = await Friendship.findAll();
    if(friendshipList){
        friendshipList.map(f=>{
            console.log(f.toJSON());
            //console.log(JSON.stringify(f.dataValues));
            console.log(f.dataValues.level);
        });
    }
    
    console.log(">> Post.findAll()");
    const postList = await Post.findAll();
    if(postList){
        postList.map(p=>{            
            console.log(p.toJSON());
            //console.log(JSON.stringify(p.dataValues));
            console.log(p.dataValues.body);
            console.log(new Date(p.dataValues.created_at).toLocaleDateString());
        });
    }
    
}

TestDB();