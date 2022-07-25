import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./db/bookstore.sqlite'
});

export const Author = sequelize.define("Author",{
    author_id: {type:DataTypes.UUID, allowNull:false, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, allowNull:false},
    bio: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    //isDeleted: { type:DataTypes.BOOLEAN, allowNull:false, defaultValue:false}
},{
    tableName:'authors',
    paranoid: true
});

export const Book = sequelize.define("Book",{
    book_id: {type:DataTypes.UUID, allowNull:false, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, allowNull:false},
    slug: DataTypes.STRING,
    tagline: DataTypes.STRING,
    coverUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    //isDeleted: { type:DataTypes.BOOLEAN, allowNull:false, defaultValue:false}
},{
    tableName:'books',
    paranoid: true
});

export const Authorship = sequelize.define("Authorship",{
    authorship_id: {type:DataTypes.UUID, allowNull:false, primaryKey: true, defaultValue: DataTypes.UUIDV1},
    author_id: {type:DataTypes.UUID, allowNull:false},
    book_id: {type:DataTypes.UUID, allowNull:false},
    //isDeleted: { type:DataTypes.BOOLEAN, allowNull:false, defaultValue:false}
},{
    tableName:'authorships',
    paranoid:true
});