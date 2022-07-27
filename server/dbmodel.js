const db = require('./dbconnetction')
const {DataTypes} = require("sequelize");

const Articles = db.define('articles', {
    header:DataTypes.TEXT,
    text:DataTypes.TEXT,
    articleDescription:DataTypes.STRING(100),
    mainImg:DataTypes.STRING,
    likes:DataTypes.INTEGER,
    dislikes:DataTypes.INTEGER,
    views:DataTypes.INTEGER,
})
const Comments = db.define('comments', {
    text:DataTypes.STRING(100),
    likes:DataTypes.INTEGER,
    dislikes:DataTypes.INTEGER,
})

const Users = db.define('users', {
    name:DataTypes.STRING(50),
    avatar:DataTypes.STRING
}, {
    timestamps: false,
})

Articles.hasMany(Comments);
Comments.hasOne(Articles);
Users.hasMany(Articles);
Articles.hasOne(Users)
Users.hasMany(Comments);
Comments.hasOne(Users)


module.exports = {
    Articles,
    Comments,
    Users
}