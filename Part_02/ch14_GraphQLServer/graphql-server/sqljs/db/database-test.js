import initSqlJs from 'sql.js';
import fs from 'fs';

const filebuffer = fs.readFileSync('./graph-db.sqlite');

initSqlJs().then(function(SQL){
    // create db
    const db = new SQL.Database(filebuffer);

    let result = db.exec("SELECT * FROM users;");
    //console.log(result);
    //console.log(result[0].columns);
    //console.log(result[0].values);

    //console.log(result[0].values.length)
    //result[0].values.forEach(r=>)
    if(result){
        result.forEach(r=>{
            if(r && r.values){
                console.log("columns: ", r.columns, "; rows: ", r.values.length);
                r.values.forEach(v=>{
                    //console.log(v);
                    console.log(v.join(","));
                });
            }
        });
    }

    result = db.exec("SELECT * FROM usersFriends;");
    if(result){
        result.forEach(r=>{
            if(r && r.values){
                console.log("columns: ", r.columns, "; rows: ", r.values.length);
                r.values.forEach(v=>{
                    console.log(v.join(","));
                });
            }
        });
    }

    result = db.exec("SELECT * FROM posts;");
    if(result){
        result.forEach(r=>{
            if(r && r.values){
                console.log("columns: ", r.columns, "; rows: ", r.values.length);
                r.values.forEach(v=>{
                    console.log(v.join(","));
                });
            }
        });
    }


    db.close();
});