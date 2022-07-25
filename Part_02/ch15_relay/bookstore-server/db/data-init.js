import { sequelize, Author, Book, Authorship } from './tables-define.js';
import { QueryTypes } from 'sequelize';

Author.hasMany(Authorship);
Book.hasMany(Authorship);
Authorship.belongsTo(Book);
Authorship.belongsTo(Author);

(async()=>{
    // create table in sqlite db
    await sequelize.sync();

    // empty authors table first
    await sequelize.query('delete from authors;',{ type: QueryTypes.DELETE});
    // add authors
    /*
    const Ari = new Author({
        author_id:DataTypes.UUIDV4
        ,name:'Ari Lerner'
        ,bio:'Ari bio'
        ,avatarUrl:'./public/images/faces/ari-lerner.png'
    });
    const Nate = new Author({
        author_id:DataTypes.UUIDV4
        ,name:'Nate Murray'
        ,bio:'Nate bio'
        ,avatarUrl:'./public/images/faces/nate-murray.png'
    });
    const Felipe = new Author({
        author_id:DataTypes.UUIDV4
        ,name:'Felipe Coury'
        ,bio:''
        ,avatarUrl:'./public/images/faces/felipe.png'
    });
    const Carlos = new Author({
        author_id:DataTypes.UUIDV4
        ,name:'Carlos Tabourda'
        ,bio:''
        ,avatarUrl:'./public/images/faces/carlos.png'
    });
    const Anthony = new Author({
        author_id:DataTypes.UUIDV4
        ,name:'Anthony Accomazzo'
        ,bio:''
        ,avatarUrl:'./public/images/faces/anthony-accomazzo.png'
    });
    const Clay = new Author({
        author_id:DataTypes.UUIDV4
        ,name:'Clay Allsopp'
        ,bio:''
        ,avatarUrl:'./public/images/faces/clay-allsopp.png'
    });
    const David = new Author({
        author_id:DataTypes.UUIDV4
        ,name:'David Guttman'
        ,bio:''
        ,avatarUrl:'./public/images/faces/david-guttman.png'
    });
    const Tyler = new Author({
        author_id:DataTypes.UUIDV4
        ,name:'Tyler McGinnis'
        ,bio:''
        ,avatarUrl:'./public/images/faces/tyler-mcginnis.png'
    });
    const authors = await Author.bulkCreate([
        Ari.toJSON()
        //{name:'Ari Lerner', bio:'Ari bio', avatarUrl:'./public/images/faces/ari-lerner.png'}
        ,Nate.toJSON()
        //,{name:'Nate Murray', bio:'Nate bio', avatarUrl:'./public/images/faces/nate-murray.png'}
        ,Felipe.toJSON()
        //,{name:'Felipe Coury', bio:'', avatarUrl:'./public/images/faces/felipe.png'}
        ,Carlos.toJSON()
        //,{name:'Carlos Tabourda', bio:'', avatarUrl:'./public/images/faces/carlos.png'}
        ,Anthony.toJSON()
        //,{name:'Anthony Accomazzo', bio:'', avatarUrl:'./public/images/faces/anthony-accomazzo.png'}
        ,Clay.toJSON()
        //,{name:'Clay Allsopp', bio:'', avatarUrl:'./public/images/faces/clay-allsopp.png'}
        ,David.toJSON()
        //,{name:'David Guttman', bio:'', avatarUrl:'./public/images/faces/david-guttman.png'}
        ,Tyler.toJSON()
        //,{name:'Tyler McGinnis', bio:'', avatarUrl:'./public/images/faces/tyler-mcginnis.png'}
    ]);
    */
    const Ari = await Author.create(
        {name:'Ari Lerner', bio:'Ari bio', avatarUrl:'./public/images/faces/ari-lerner.png'}
    );
    await Ari.save();

    //console.log(Ari);
    //console.log(Ari.getDataValue("author_id"));
    //console.log(Ari.dataValues.author_id);

    const Nate = await Author.create(
        {name:'Nate Murray', bio:'Nate bio', avatarUrl:'./public/images/faces/nate-murray.png'}
    );
    await Nate.save();

    const Felipe = await Author.create(
        {name:'Felipe Coury', bio:'', avatarUrl:'./public/images/faces/felipe.png'}
    );
    await Felipe.save();

    const Carlos = await Author.create(
        {name:'Carlos Tabourda', bio:'', avatarUrl:'./public/images/faces/carlos.png'}
    );
    await Carlos.save();

    const Anthony = await Author.create(
        {name:'Anthony Accomazzo', bio:'', avatarUrl:'./public/images/faces/anthony-accomazzo.png'}
    );
    await Anthony.save();

    const Clay = await Author.create(
        {name:'Clay Allsopp', bio:'', avatarUrl:'./public/images/faces/clay-allsopp.png'}
    );
    await Clay.save();

    const David = await Author.create(
        {name:'David Guttman', bio:'', avatarUrl:'./public/images/faces/david-guttman.png'}
    );
    await David.save();

    const Tyler = await Author.create(
        {name:'Tyler McGinnis', bio:'', avatarUrl:'./public/images/faces/tyler-mcginnis.png'}
    );
    await Tyler.save();

    console.log("Author.Create : ");
    console.log([
        Ari.toJSON(), Nate.toJSON(), Felipe.toJSON(), Carlos.toJSON()
        ,Anthony.toJSON(), Clay.toJSON(), David.toJSON(), Tyler.toJSON()
    ]);
    const authors_count = await sequelize.query('select count(*) from authors;',{ type: QueryTypes.SELECT});
    console.log(JSON.stringify(authors_count));

    // empty books table first
    await sequelize.query('delete from books;',{ type: QueryTypes.DELETE});
    // add books
    const fullstackReact = await Book.create({
        name:'Fullstack React'
        ,slug:'fullstack-react'
        ,tagline:'The Complete Book on ReactJS and Friends'
        ,coverUrl:'./public/images/books/fullstack_react_book_cover.png'
        ,description:'Build awesome apps in React in record time.'
    });
    await fullstackReact.save();

    const ngJsBook = await Book.create({
        name:'ng-book classic'
        ,slug:'ng-book-classic'
        ,tagline:'The Complete Book on AngularJS'
        ,coverUrl:'./public/images/books/ng_book_1_cover.png'
        ,description:'Learn Angular 1 with this classic book.'
    });
    await ngJsBook.save();

    const ngBook = await Book.create({
        name:'ng-book'
        ,slug:'ng-book'
        ,tagline:'The Complete Book on Angular 2'
        ,coverUrl:'./public/images/books/ng_book_2_cover.png'
        ,description:'ng-book is the easiest way to learn Angular.'
    });
    await ngBook.save();
    
    console.log("Book.Create : ");
    console.log([fullstackReact.toJSON(), ngJsBook.toJSON(), ngBook.toJSON()]);
    const books_count = await sequelize.query('select count(*) from books;',{ type: QueryTypes.SELECT});
    console.log(JSON.stringify(books_count));

    // empty authorships table first
    await sequelize.query('delete from authorships;',{ type: QueryTypes.DELETE});
    // add authorships
    /*
    let authorship = await Authorship.create({
        author_id: Anthony.getDataValue("author_id"),
        book_id: fullstackReact.getDataValue("book_id")
    });
    await authorship.save();
    */
    const authorships = await Authorship.bulkCreate([{
        author_id: Anthony.getDataValue("author_id"),
        book_id: fullstackReact.getDataValue("book_id")
    },{
        author_id: Ari.getDataValue("author_id"),
        book_id: fullstackReact.getDataValue("book_id")
    },{
        author_id: David.getDataValue("author_id"),
        book_id: fullstackReact.getDataValue("book_id")
    },{
        author_id: Clay.getDataValue("author_id"),
        book_id: fullstackReact.getDataValue("book_id")
    },{
        author_id: Tyler.getDataValue("author_id"),
        book_id: fullstackReact.getDataValue("book_id")
    },{
        author_id: Nate.getDataValue("author_id"),
        book_id: fullstackReact.getDataValue("book_id")
    },{
        author_id: Ari.getDataValue("author_id"),
        book_id: ngJsBook.getDataValue("book_id")
    },{
        author_id: Nate.getDataValue("author_id"),
        book_id: ngBook.getDataValue("book_id")
    },{
        author_id: Ari.getDataValue("author_id"),
        book_id: ngBook.getDataValue("book_id")
    },{
        author_id: Felipe.getDataValue("author_id"),
        book_id: ngBook.getDataValue("book_id")
    },{
        author_id: Carlos.getDataValue("author_id"),
        book_id: ngBook.getDataValue("book_id")
    }]);
    console.log("Authorship.bulkCreate : ");
    console.log(authorships);
    const authorships_count = await sequelize.query('select count(*) from authorships;',{ type: QueryTypes.SELECT});
    console.log(JSON.stringify(authorships_count));

})();