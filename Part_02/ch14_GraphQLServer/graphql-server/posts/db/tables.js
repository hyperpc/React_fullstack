import { Sequelize, DataTypes } from 'sequelize'; 
//import { zlib, createGzip } from 'node::zlib';

export const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./posts/db/graph-db.sqlite',
    //logging:(...msg)=>console.log(msg)
});

export const User = sequelize.define('User',{
    user_id:{type:DataTypes.INTEGER, allowNull: false},
    name:{type:DataTypes.TEXT, allowNull: false, defaultValue: ''},
    about:DataTypes.TEXT
},{
    tableName:'users',
    paranoid:true
});

export const Friendship = sequelize.define('Friendship',{
    user_id:{type:DataTypes.INTEGER, allowNull: false},
    friend_user_id:{type:DataTypes.INTEGER, allowNull: false},
    level:{type:DataTypes.INTEGER, allowNull: false}
},{
    tableName:'usersFriends',
    paranoid:true
});

export const Post = sequelize.define('Post',{
    postId:{type:DataTypes.INTEGER, allowNull: false},
    user_id:{type:DataTypes.INTEGER, allowNull: false},
    body:{type:DataTypes.TEXT, allowNull: false},
    level:{type:DataTypes.INTEGER, allowNull: false},
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
},{
    tableName:'posts',
    paranoid:true
});
