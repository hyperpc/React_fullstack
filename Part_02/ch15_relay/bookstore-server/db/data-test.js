import { Op } from 'sequelize'; 
import { sequelize, Author, Book, Authorship } from './tables-define.js';

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

    console.log(">> Author.findOne(1)");
    const author = await Author.findOne({
        where:{
            name:{
                [Op.eq]:"Ari Lerner"
            }
        }
    });

    console.log(JSON.stringify(author.dataValues));
    console.log(author.dataValues);
    console.log(author.dataValues.name);

    console.log(">> Author.findAll()");
    const authorList = await Author.findAll();
    //console.log(authorList);
    if(authorList){
        authorList.map(u=>{
            console.log(u.toJSON());
            //console.log(JSON.stringify(u.dataValues));
            console.log(u.dataValues.name);
        });
    }

    console.log(">> Book.findAll()");
    const bookList = await Book.findAll();
    if(bookList){
        bookList.map(b=>{
            console.log(b.toJSON());
            //console.log(JSON.stringify(b.dataValues));
            console.log(b.dataValues.name);
        });
    }
    
    console.log(">> Authorship.findAll()");
    const authorshipList = await Authorship.findAll();
    if(authorshipList){
        authorshipList.map(p=>{            
            console.log(p.toJSON());
            //console.log(JSON.stringify(p.dataValues));
            console.log(p.dataValues.authorship_id);
        });
    }
    
}

TestDB();