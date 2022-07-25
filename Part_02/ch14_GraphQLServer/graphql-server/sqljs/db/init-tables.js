import initSqlJs from 'sql.js';
import fs from 'fs';

initSqlJs().then(function(SQL){
    // create db
    const db = new SQL.Database();

    console.log("Create tables and init data...");
    // create table and init data
    const createTableUsers = "CREATE TABLE users(id integer PRIMARY KEY, name text, about text)";
    db.run(createTableUsers);
    const initTableUsersData= "INSERT INTO users(id, name, about)\
    values(1, 'Harry', 'Sports!'), (2, 'David', 'I''m the best'), (3, 'Hannah', 'Love books'),\
    (4, 'Roger', 'Here for a good time'), (5, 'Katie', 'Better at sports than Harry');";
    db.run(initTableUsersData);

    const createTableUsersFriends = "CREATE TABLE usersFriends(user_id_a integer, user_id_b integer, level text)";
    db.run(createTableUsersFriends);
    const initTableUsersFriendsData= "INSERT INTO usersFriends(user_id_a, user_id_b, level)\
    values (1, 3, 'top'), (3, 1, 'top'), (1, 4, 'top'), (4, 1, 'top'), (3, 4, 'top'), (4, 3, 'top'),\
    (1, 5, 'friend'), (5, 1, 'friend'), (2, 5, 'friend'), (5, 2, 'friend'),\
     (4, 2, 'acquaintance'), (2, 4, 'acquaintance');";
    db.run(initTableUsersFriendsData);
    
    const createTablePosts = "CREATE TABLE posts(id integer PRIMARY KEY, user_id integer, body text, level text, created_at datetime)";
    db.run(createTablePosts);
    const initTablePostsData= "INSERT INTO posts (id, user_id, body, level, created_at)\
    values(1, 1, 'The team played a great game today!', 'acquaintance', '2016-04-01'),\
    (2, 1, 'Honestly I didn''t do so well at yesterday''s game, but everyone else did.', 'top', '2016-04-02'),\
    (3, 2, 'Hard at work studying for finals...', 'friend', '2016-04-03'),\
    (4, 3, 'Excited for finals!', 'public', '2016-03-31');";
    db.run(initTablePostsData);



    console.log("Write database file to disk...");
    // write db to disk
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync("./graph-db.sqlite", buffer);

    console.log("Done.");
});