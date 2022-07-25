import { Op, QueryTypes } from 'sequelize'; 
import { Author, Book, Authorship, sequelize } from '../db/tables-define.js';
import fs from 'fs';

const serverUrl = `http://localhost:4000`;

export const resolvers = {
    Query:{
        /**
         * Query Author
         */
         getAllAuthors: async()=>{
            let authors=[];
            const authorList= await Author.findAll({
                where:{
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null
                }
            }); 

            if(authorList){
                authorList.map(async(author)=>{
                    //console.log(author.toJSON());
                    //console.log(JSON.stringify(author.dataValues));
                    if(author.dataValues){
                        const u = author.dataValues;
                        let avatarUrl = u.avatarUrl;
                        let content=avatarUrl;
                        if(avatarUrl){
                            const body = fs.readFileSync(avatarUrl);
                            content = body.toString('base64');
                            //console.log(content);
                        }

                        const authorships = authorshipList.filter(s=>s.author_id===author.author_id);
                        const bookCount =authorships.length;
                        //console.log(author_authorships);
                        //console.log(author_authorships.length);

                        authors.push({
                            author_id:u.author_id 
                            ,name:u.name
                            ,bio:u.bio
                            ,avatarUrl:avatarUrl
                            ,avatarContent:`data:image/png;base64,${content}`
                            ,bookCount:bookCount
                        });
                    }
                });
            }
            return authors;
        }
        ,getAuthorById:async(root, args, context, info)=>{
            //console.log("getAuthorById");
            //console.log(context);
            //console.log(context.user_id);
            //if(!context || context.user_id!=1){ return null; }
            //console.log(args.authorId);
            const author = await Author.findOne({
                where:{
                    author_id:{
                        [Op.eq]:args.authorId
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null,
                    author_id:args.authorId
                }
            }); 
            const bookCount =authorshipList.length;

            if(author){
                //console.log(author.toJSON());
                const books_of_author = await Authorship.findAll({
                    where:{
                        deletedAt:null,
                        author_id: author.author_id
                    }
                });
                const countBooks = books_of_author.length;
                let avatarUrl = author.avatarUrl;
                let content=avatarUrl;
                if(avatarUrl){
                    const body = fs.readFileSync(avatarUrl);
                    content = body.toString('base64');
                    //console.log(content);
                }
                return {
                    author_id:author.author_id
                    ,name:author.name
                    ,bio:author.bio
                    ,avatarUrl:avatarUrl
                    ,avatarContent:`data:image/png;base64,${content}`
                    ,bookCount: bookCount
                };
            }
            return null;
        }
        ,getAuthorsByIds:async(root, args, context, info)=>{
            //console.log(args.ids);
            let authors=[];
            const authorList = await Author.findAll({
                where:{
                    author_id:{
                        [Op.in]:args.ids
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null
                }
            }); 

            if(authorList){
                //console.log(authorList);
                authorList.map(author=>{
                    //console.log(author.toJSON());
                    //console.log(JSON.stringify(author.dataValues));
                    if(author.dataValues){
                        const u = author.dataValues;
                        let avatarUrl = u.avatarUrl;
                        let content=avatarUrl;
                        if(avatarUrl){
                            const body = fs.readFileSync(avatarUrl);
                            content = body.toString('base64');
                            //console.log(content);
                        }
                        const authorships = authorshipList.filter(s=>s.author_id===u.author_id);
                        const bookCount =authorships.length;

                        authors.push({
                            author_id:u.author_id 
                            ,name:u.name
                            ,bio:u.bio
                            ,avatarUrl:avatarUrl
                            ,avatarContent:`data:image/png;base64,${content}`
                            ,bookCount:bookCount
                        });
                    }
                });
            }
            return authors;
        }
        /**
         * Query Book
         */
        ,getAllBooks: async()=>{
            let books=[];
            const bookList= await Book.findAll({
                where:{
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null
                }
            }); 
            if(bookList){
                bookList.map(book=>{
                    //console.log(book.toJSON());
                    //console.log(JSON.stringify(book.dataValues));
                    if(book.dataValues){
                        const b = book.dataValues;
                        let coverUrl = b.coverUrl;
                        let content=coverUrl;
                        if(coverUrl){
                            const body = fs.readFileSync(coverUrl);
                            content = body.toString('base64');
                            //console.log(content);
                        }
                        const authorships = authorshipList.filter(s=>s.book_id===b.book_id);
                        const authorCount =authorships.length;

                        books.push({
                            book_id:b.book_id 
                            ,name:b.name
                            ,slug:b.slug
                            ,tagline:b.tagline
                            ,coverUrl:coverUrl
                            ,coverContent:`data:image/png;base64,${content}`
                            ,description:b.description
                            ,authorCount:authorCount
                        });
                    }
                });
            }
            return books;
        }
        ,getAllBooksInPagination: async(root, args, context, info)=>{
            let books=[];
            const pageSize=args.limit>0?args.limit:10;
            const offset=args.offset>0?args.offset:0;

            let query = `SELECT book_id, name, slug, tagline, coverUrl, description
            FROM books AS Book 
            WHERE Book.deletedAt IS NULL 
            LIMIT ${pageSize} 
            OFFSET ${offset} ;`;

            const bookList = await sequelize.query(query,{
                type:QueryTypes.SELECT
            });
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null
                }
            }); 
            //console.log(bookList);
            if(bookList){
                bookList.map(book=>{
                    //console.log(JSON.stringify(book));
                    let coverUrl = book.coverUrl;
                    let content=coverUrl;
                    if(coverUrl){
                        const body = fs.readFileSync(coverUrl);
                        content = body.toString('base64');
                        //console.log(content);
                    }
                    const authorships = authorshipList.filter(s=>s.book_id===book.book_id);
                    const authorCount =authorships.length;

                    books.push({
                        book_id:book.book_id 
                        ,name:book.name
                        ,slug:book.slug
                        ,tagline:book.tagline
                        ,coverUrl:coverUrl
                        ,coverContent:`data:image/png;base64,${content}`
                        ,description:book.description
                        ,authorCount: authorCount
                    });
                });
            }

            return books;
        }
        ,getBookById:async(root, args, context, info)=>{
            //console.log("getBookById");
            //console.log(context);
            //console.log(context.user_id);
            //if(!context || context.user_id!=1){ return null; }

            const book = await Book.findOne({
                where:{
                    book_id:{
                        [Op.eq]:args.bookId
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null,
                    book_id: book.book_id
                }
            }); 
            const authorCount =authorshipList.length;

            if(book){
                //console.log(book.toJSON());
                let coverUrl = book.coverUrl;
                let content=coverUrl;
                if(coverUrl){
                    const body = fs.readFileSync(coverUrl);
                    content = body.toString('base64');
                    //console.log(content);
                }
                return {
                    book_id:book.book_id
                    ,name:book.name
                    ,slug:book.slug
                    ,tagline:book.tagline
                    ,coverUrl:coverUrl
                    ,coverContent:`data:image/png;base64,${content}`
                    ,description:book.description
                    ,authorCount:authorCount
                };
            }
            return null;
        }
        ,getBooksByIds:async(root, args, context, info)=>{
            //console.log(args.ids);
            let books=[];
            const bookList = await Book.findAll({
                where:{
                    book_id:{
                        [Op.in]:args.ids
                    },
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null
                }
            }); 
            if(bookList){
                //console.log(bookList);
                bookList.map(book=>{
                    //console.log(book.toJSON());
                    //console.log(JSON.stringify(book.dataValues));
                    if(book.dataValues){
                        const b = book.dataValues;
                        let coverUrl = b.coverUrl;
                        let content=coverUrl;
                        if(coverUrl){
                            const body = fs.readFileSync(coverUrl);
                            content = body.toString('base64');
                            //console.log(content);
                        }
                        const authorships = authorshipList.filter(s=>s.book_id===book.book_id);
                        const authorCount =authorships.length;

                        books.push({
                            book_id:b.book_id
                            ,name:b.name
                            ,slug:b.slug
                            ,tagline:b.tagline
                            ,coverUrl:coverUrl
                            ,coverContent:`data:image/png;base64,${content}`
                            ,description:b.description
                            ,authorCount:authorCount
                        });
                    }
                });
            }
            return books;
        }
        /**
         * Query Authorship
         */
        ,getAllAuthorships: async()=>{
            let authorships=[];
            const authorshipList= await Authorship.findAll({
                where:{
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(authorshipList){
                authorshipList.map(authorship=>{
                    //console.log(authorship.toJSON());
                    //console.log(JSON.stringify(authorship.dataValues));
                    if(authorship.dataValues){
                        const s = authorship.dataValues;
                        authorships.push({
                            authorship_id:s.authorship_id, 
                            author_id:s.author_id,
                            book_id:s.book_id
                        });
                    }
                });
            }
            return authorships;
        }
        /**
         * Query in Pagination
         */
        ,getBooksByAuthorIdInPagination:async(root, args, context, info)=>{
            let books = [];
            //console.log(context.user_id);
            const pageSize=args.limit>0?args.limit:10;
            const offset=args.offset>0?args.offset:0;

            let query = `SELECT book_id, name, slug, tagline, coverUrl, description  
            FROM books AS Book 
            WHERE ( 
                Book.deletedAt IS NULL 
                AND EXISTS( 
                        SELECT 1 FROM authorships AS Authorship 
                        WHERE Authorship.deletedAt IS NULL 
                        AND Authorship.book_id=Book.book_id 
                        AND EXISTS( 
                                SELECT 1 FROM authors AS Author
                                WHERE Author.deletedAt IS NULL 
                                AND Author.author_id=Authorship.author_id 
                                AND Author.author_id='${args.authorId}' 
                            ) 
                    ) 
            ) 
            LIMIT ${pageSize} 
            OFFSET ${offset} ;`;

            const bookList = await sequelize.query(query,{
                type:QueryTypes.SELECT
            });
            //console.log(bookList);
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null
                }
            }); 

            if(bookList){
                bookList.map(b=>{
                    //console.log(b);
                    let coverUrl = b.coverUrl;
                    let content=coverUrl;
                    if(coverUrl){
                        const body = fs.readFileSync(coverUrl);
                        content = body.toString('base64');
                        //console.log(content);
                    }
                    const authorships = authorshipList.filter(s=>s.book_id===b.book_id);
                    const authorCount =authorships.length;

                    books.push({
                        book_id:b.book_id 
                        ,name:b.name
                        ,slug:b.slug
                        ,tagline:b.tagline
                        ,coverUrl:coverUrl
                        ,coverContent:`data:image/png;base64,${content}`
                        ,description:b.description
                        ,authorCount:authorCount
                    });
                });
            }
            return books;
        }
        ,getAuthorsByBookIdInPagination:async(root, args, context, info)=>{
            let authors = [];
            //console.log(context.user_id);
            const pageSize=args.limit>0?args.limit:10;
            const offset=args.offset>0?args.offset:0;

            let query = `SELECT author_id, name, bio, avatarUrl 
                ,(SELECT COUNT(*) FROM authorships AS Authorships 
                WHERE Authorships.deletedAt IS NULL 
                AND Authorships.author_id=Author.author_id 
                ) AS Book_Count 
            FROM authors AS Author 
            WHERE ( 
                Author.deletedAt IS NULL 
                AND EXISTS( 
                        SELECT 1 FROM authorships AS Authorship 
                        WHERE Authorship.deletedAt IS NULL 
                        AND Authorship.author_id=Author.author_id 
                        AND EXISTS( 
                                SELECT 1 FROM books AS Book 
                                WHERE Book.deletedAt IS NULL 
                                AND Book.book_id=Authorship.book_id 
                                AND Book.book_id='${args.bookId}' 
                            ) 
                    ) 
            ) 
            LIMIT ${pageSize} 
            OFFSET ${offset} ;`;

            const authorList = await sequelize.query(query,{
                type:QueryTypes.SELECT
            });
            //console.log(authorList);
            const authorshipList = await Authorship.findAll({
                where:{
                    deletedAt:null
                }
            }); 

            if(authorList){
                authorList.map(async(a)=>{
                    //console.log(a);
                    let avatarUrl = a.avatarUrl;
                    let content=avatarUrl;
                    if(avatarUrl){
                        const body = fs.readFileSync(avatarUrl);
                        content = body.toString('base64');
                        //console.log(content);
                    }
                    const authorships = authorshipList.filter(s=>s.author_id===a.author_id);
                    const bookCount =authorships.length;

                    authors.push({
                        author_id:a.author_id 
                        ,name:a.name
                        ,bio:a.bio
                        ,avatarUrl:avatarUrl
                        ,avatarContent:`data:image/png;base64,${content}`
                        ,bookCount:bookCount
                    });
                });
            }

            return authors;
        }
    },
    Mutation:{
        updateAuthor: async(root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            let count_update = await Author.update({
                name: args.name,
                bio: args.bio,
                avatarUrl: args.avatarUrl
            },{
                where:{
                    author_id: args.authorId,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(count_update[0]<1){
                result.isError=true;
                result.message=`[Fail]: Not found user(${args.authorId})`;
                return result;
            }

            let author = await Author.findOne({
                where:{
                    author_id:args.authorId
                }
            });
            //console.log(author.toJSON());
            //result=result+(JSON.stringify(author.dataValues));
            result.message=`[Success]: ${count_update[0]} record(s) updated.`;
            //console.log(result);

            return result;
        }
        ,updateBook: async(root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            let count_update = await Book.update({
                name: args.name,
                slug: args.slug,
                tagline: args.tagline,
                coverUrl: args.coverUrl,
                description: args.description
            },{
                where:{
                    book_id: args.bookId,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(count_update[0]<1){
                result.isError=true;
                result.message=`[Fail]: Not found Book(${args.bookId})`;
                return result;
            }

            let book = await Book.findOne({
                where:{
                    book_id:args.bookId
                }
            });
            //console.log(book.toJSON());
            //result=result+(JSON.stringify(book.dataValues));
            result.message=`[Success]: ${count_update[0]} record(s) updated.`;
            //console.log(result);

            return result;
        }
        ,updateAuthorship: async(root, args, context, info)=>{
            let result = {isError:false, message: `Success!`};
            let count_update = await Authorship.update({
                author_id: args.authorId,
                book_id: args.bookId
            },{
                where:{
                    authorship_id: args.authorshipId,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(count_update[0]<1){
                result.isError=true;
                result.message=`[Fail]: Not found Authorship(${args.authorshipId})`;
                return result;
            }

            let authorship = await Authorship.findOne({
                where:{
                    authorship_id:args.authorshipId
                }
            });
            //console.log(authorship.toJSON());
            //result=result+(JSON.stringify(authorship.dataValues));
            result.message=`[Success]: ${count_update[0]} record(s) updated.`;
            //console.log(result);

            return result;
        }
    }

};