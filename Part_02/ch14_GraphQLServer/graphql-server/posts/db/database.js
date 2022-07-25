import { sequelize, User, Friendship, Post } from './tables.js';
import { QueryTypes } from 'sequelize'; 

//import { Sequelize, Op } from 'sequelize'; 

User.hasMany(Friendship);
User.hasMany(Post);
Friendship.belongsTo(User);
Post.belongsTo(User);

(async()=>{
    // create table
    await sequelize.sync();

    // init data - users
    await sequelize.query('delete from users;',{ type: QueryTypes.DELETE});
    const harry = User.build({user_id:1, name:'Harry', about:'Sport!'});
    await harry.save();
    console.log(harry);

    const david = await User.create({user_id:2, name:'David'});
    david.about='I\'m the best';
    await david.save();
    console.log(david);

    const hannah = await User.create({user_id:3});
    hannah.set({
        name:'Hannah',
        about:'Love books'
    });
    // only save field `name`
    //await hannah.save({fields: ['name']});
    await hannah.save();
    console.log(hannah);
    
    const roger = await User.create({user_id:4, name:'Roger', about:'Here for a good time'});
    roger.update({about:'[updated] Here for a good time'});
    await roger.save();
    console.log(roger);

    const katie = await User.create({user_id:5, name:'Katie', about:'Better at sports than Harry'});
    await katie.save();
    console.log(katie);

    // init data - usersFriends
    await sequelize.query('delete from usersFriends;',{ type: QueryTypes.DELETE});
    const friendships = await Friendship.bulkCreate([
        { user_id:1, friend_user_id:3, level:3 },
        { user_id:3, friend_user_id:1, level:3 },
        { user_id:3, friend_user_id:4, level:3 },
        { user_id:4, friend_user_id:3, level:3 },
        { user_id:1, friend_user_id:5, level:2 },
        { user_id:5, friend_user_id:1, level:2 },
        { user_id:2, friend_user_id:5, level:2 },
        { user_id:5, friend_user_id:2, level:2 },
        { user_id:2, friend_user_id:4, level:1 },
        { user_id:4, friend_user_id:2, level:1 }
    ]);
    console.log("Friendship.bulkCreate : ");
    console.log(friendships);

    // init data - posts
    const posts = await Post.bulkCreate([
        {postId:1, user_id:1, body:'The team played a great game today!', level:1, created_at:'2016-04-01'}
        ,{postId:2, user_id:1, body:'Honestly I didn\'t do so well at yesterday\'s game, but everyone else did.', level:3, created_at:'2016-04-02'}
        ,{postId:3, user_id:2, body:'Hard at work studying for finals...', level:2, created_at:'2016-04-03'}
        ,{postId:4, user_id:3, body:'Excited for finals!', level:0, created_at:'2016-03-31'}
    ]);
    console.log("Post.bulkCreate : ");
    console.log(posts);
    
    const result = await sequelize.query('select count(*) from users;',{ type: QueryTypes.SELECT});
    console.log(JSON.stringify(result));

    /*
    const user = await User.findOne({
        where:{
            user_id:{
                [Op.eq]:1
            }
        }
    }).then(u=>{console.log(u.toJSON());});

    console.log(user);
    */
})();

