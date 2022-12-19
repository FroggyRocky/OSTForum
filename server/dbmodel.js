const db = require('./dbconnetction')
const {DataTypes} = require("sequelize");

const Article = db.define('article', {
    header:DataTypes.STRING(55),
    text:DataTypes.TEXT,
    description:DataTypes.STRING(240),
    previewDescription:DataTypes.STRING(95),
    coverImg_withText:DataTypes.STRING,
    coverImg_withOutText:DataTypes.STRING,
    usersLiked: {
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO LIKED THE ARTICLE
    usersDisliked:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO DISLIKED THE ARTICLE
    usersViewed:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO LIKED VIEWED THE ARTICLE,
    categoryIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }
})
const Comments = db.define('comments', {
    text:DataTypes.STRING(100),
    usersLiked:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO LIKED THE COMMENT
    usersDisliked:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO LIKED THE COMMENT
})

const Users = db.define('users', {
    name:DataTypes.STRING(50),
    login:DataTypes.STRING(50),
    password:DataTypes.STRING(60),
    avatar:DataTypes.STRING,
}, {
    timestamps: false,
    scopes: {
        withoutSecretData: {
            attributes: { exclude: ['password', 'login'] },
        }
    }
})

//article's topics
const Categories = db.define('categories', {
    name:DataTypes.STRING
}, {
    timestamps:false
})
const RefreshTokens = db.define('refresh_tokens', {
    token:DataTypes.STRING
})

Users.hasMany(Article);
Article.belongsTo(Users)
Users.hasMany(Comments);
Comments.belongsTo(Users)
Article.hasMany(Comments);
Comments.belongsTo(Article);



module.exports = {
    Article,
    Comments,
    Users,
    Categories,
    RefreshTokens
}