import { Op, QueryTypes } from 'sequelize'; 
import { User, Friendship, Post, sequelize } from './db/tables.js';

const AccessLevels = ['public', 'acquaintance', 'friend', 'top', 'self'];

export const resolvers = {
    Query:{
        /**
         * Query User
         */
        getAllUsers: async()=>{
            let users=[];
            const userList= await User.findAll({
                where:{
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(userList){
                userList.map(user=>{
                    //console.log(user.toJSON());
                    //console.log(JSON.stringify(user.dataValues));
                    if(user.dataValues){
                        const u = user.dataValues;
                        users.push({
                            user_id:u.user_id, 
                            name:u.name,
                            about:u.about
                        });
                    }
                });
            }
            return users;
        }
        ,getUserById:async(root, args, context, info)=>{
            //console.log("getUserById");
            //console.log(context);
            //console.log(context.user_id);
            if(!context || context.user_id!=1){
                return null;
            }

            const user = await User.findOne({
                where:{
                    user_id:{
                        [Op.eq]:args.userId
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(user){
                //console.log(user.toJSON());
                return {user_id:user.user_id, name:user.name, about:user.about};
            }
            return null;
        }
        ,getUsersByIds:async(root, args, context, info)=>{
            //console.log(args.ids);
            let users=[];
            const userList = await User.findAll({
                where:{
                    user_id:{
                        [Op.in]:args.ids
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(userList){
                //console.log(userList);
                userList.map(user=>{
                    //console.log(user.toJSON());
                    //console.log(JSON.stringify(user.dataValues));
                    if(user.dataValues){
                        const u = user.dataValues;
                        users.push({
                            user_id:u.user_id, 
                            name:u.name,
                            about:u.about}
                        );
                    }
                });
            }
            return users;
        }
        /**
         * Query Friendship
         */
        ,getMyFriendshipInOrder:async()=>{
            let friendships = [];
            const friendshipList = await Friendship.findAll({
                where:{
                    deletedAt:{
                        [Op.is]:null
                    }
                },
                /*
                attributes:[
                    'user_id',
                    'friend_user_id',
                    [sequelize.fn('UPPER', sequelize.col('level')), 'LVL']
                ],
                */
                order:[
                    ['user_id'],
                    ['friend_user_id', 'DESC'],
                    ['level', 'DESC'],
                    //sequelize.fn('UPPER', sequelize.col('level')),
                    //[sequelize.fn('UPPER', sequelize.col('level')), 'DESC']
                ]
            });
            if(friendshipList){
                friendshipList.map(friend=>{
                    if(friend.dataValues){
                        const f = friend.dataValues;
                        friendships.push({
                            user_id:f.user_id, 
                            friend_user_id:f.friend_user_id,
                            level:f.level}
                        );
                    }
                });
            }
            return friendships;
        }
        /**
         * Query Post
         */
        ,getMyPostsInPagination:async(root, args, context, info)=>{
            let posts = [];
            const postList = await Post.findAll({
                where:{
                    user_id:context.user_id
                },
                /*
                attributes:[
                    'postId',
                    'user_id',
                    'body',
                    'level',
                    //[sequelize.fn('UPPER', sequelize.col('level')), 'LVL'],
                    //[sequelize.fn('datetime', sequelize.col('created_at'), 'unixepoch'), 'created_at']
                    'created_at'
                ],
                */
                order:[
                    ['created_at', 'DESC']
                ],
                limit:5,
                offset:0
            });
            if(postList){
                postList.map(post=>{
                    if(post.dataValues){
                        const p = post.dataValues;
                        posts.push({
                            postId:p.postId,
                            user_id:p.user_id,
                            body:p.body,
                            level:p.level,
                            levelName:getAccessLevelName(p.level),
                            created_at:new Date(p.created_at).toLocaleDateString()}
                        );
                    }
                });
            }
            return posts;
        }
        ,getFriendsPostsInPagination:async(root, args, context, info)=>{
            let posts = [];
            //console.log(context.user_id);
            let query = `SELECT postId, user_id, body, level, created_at 
            FROM posts AS Post 
            WHERE ( 
                Post.deletedAt IS NULL 
                AND EXISTS( 
                        SELECT 1 FROM usersFriends AS Friendship 
                        WHERE Friendship.deletedAt IS NULL 
                        AND Friendship.friend_user_id=Post.user_id 
                        AND Friendship.level>=Post.level 
                        AND EXISTS( 
                                SELECT 1 FROM users AS User 
                                WHERE User.deletedAt IS NULL 
                                AND User.user_id=Friendship.user_id 
                                AND User.user_id=${context.user_id} 
                            ) 
                    ) 
            ) 
            LIMIT 1 
            OFFSET 0;`;

            const postList = await sequelize.query(query,{
                type:QueryTypes.SELECT
            });
            console.log(postList);

            if(postList){
                postList.map(p=>{
                    console.log(p);
                    console.log(p.created_at);
                    posts.push({
                        postId:p.postId,
                        user_id:p.user_id,
                        body:p.body,
                        level:p.level,
                        levelName:getAccessLevelName(p.level),
                        created_at:new Date(p.created_at).toLocaleDateString()
                    });
                });
            }
            return posts;
        }
    },
    Mutation:{
        /**
         * mutation users
         */
        addUser:async (root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            const user = await User.findOne({
                where:{
                    user_id:args.user_id,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(user){
                result.isError=true;
                result.message=`[Fail]: Found existing user(${args.user_id})`;
                return result;
            }

            const user_add = await User.create({
                user_id:args.user_id,
                name:args.name,
                about:args.about
            });
            if(user_add){
                console.log(JSON.stringify(user_add));
                result.message=`[Success]: Add user(${args.user_id})`;
                return result;
            }

            result.isError=true;
            result.message=`[Fail]: Not able to create user(user_id:${args.user_id}, name:${args.name}, about:${args.about})`;
            return result;            
        }
        ,updateUser:async(root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            let count_update = await User.update({
                name: args.name,
                about: args.about
            },{
                where:{
                    user_id: args.user_id,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(count_update[0]<1){
                result.isError=true;
                result.message=`[Fail]: Not found user(${args.user_id})`;
                return result;
            }

            let user = await User.findOne({
                where:{
                    user_id:args.user_id
                }
            });
            console.log(user.toJSON());
            //result=result+(JSON.stringify(user.dataValues));
            result.message=`[Success]: ${count_update[0]} record(s) updated.`;
            //console.log(result);

            return result;
        }
        ,deleteUser:async(root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            const count_hard_del = await User.destroy({
                where:{
                    user_id:{
                        [Op.eq]: args.user_id
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                },
                force:true // hard deleted
            });
            if(count_hard_del[0]<1){
                result.isError=true;
                result.message=`[Fail]: Not found user(${args.user_id})`;
                return result;
            }
            result.message=`[Success]: Total ${count_hard_del[0]} user(${args.user_id}) hard deleted`;
            return result;
        }
        ,restoreUser:async(root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            const count_soft_del = await User.destroy({
                where:{
                    user_id:{
                        [Op.eq]: args.user_id
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                },
                force:false // soft delete
            });
            if(count_soft_del[0]<1){
                result.isError=true;
                result.message=`[Fail]: Not found user(${args.user_id})`;
                return result;
            }
            
            const count_restored = await User.restore({
                where:{
                    user_id:{
                        [Op.eq]: args.user_id
                    }
                    ,deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(count_restored[0]<1){
                result.isError=true;
                result.message=`[Fail]: Total ${count_soft_del[0]} user(${args.user_id}) soft-deleted, but not able to restore user(${args.user_id})`;
                return result;
            }
            result.message=`[Success]: Total ${count_soft_del[0]} user(${args.user_id}) soft-deleted, and total ${count_restored[0]} user(${args.user_id}) restored`;
            return result;
        }
        ,deleteUsers:async(root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            const count_soft_del = await User.destroy({
                where:{
                    user_id:{
                        [Op.in]: args.ids
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                },
                force:false // soft delete
            });
            if(count_soft_del[0]<1){
                result.isError=true;
                result.message=`[Fail]: Not found users(${args.ids})`;
            }
            result.message=`[Success]: Total ${count_soft_del[0]} users(${args.ids}) soft-deleted`;
            return result;
        }
        /**
         * mutation posts
         */
        ,addPost:async(root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            const post = await Post.findOne({
                where:{
                    postId:args.postId,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(post){
                result.isError=true;
                result.message=`[Fail]: Found existing post(${args.postId})`;
                return result;
            }

            const post_add = await Post.create({
                postId:args.postId,
                user_id:context.user_id,
                body:args.body,
                level:args.level
            });
            if(post_add){
                console.log(JSON.stringify(post_add));
                result.message=`[Success]: Add post(${args.postId})`;
                return result;
            }

            result.isError=true;
            result.message=`[Fail]: Not able to create post(postId:${args.postId}, user_id:${context.user_id}, body:${args.body}, level:${args.level})`;
            return result;    
        }
    }
};

function getAccessLevelName(level){
    if(level>=0 && level<AccessLevels.length){
        return AccessLevels[level];
    }
    return null;
}
