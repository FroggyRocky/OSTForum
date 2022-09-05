const db = require('./dbconnetction')
const {DataTypes} = require("sequelize");

const Articles = db.define('articles', {
    header:DataTypes.TEXT,
    text:DataTypes.TEXT,
    description:DataTypes.STRING(100),
    mainImg:DataTypes.STRING,
    usersLiked: {
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO LIKED THE ARTICLE
    usersDisliked:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO DISLIKED THE ARTICLE
    usersViewed:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO LIKED VIEWED THE ARTICLE,
    categories:DataTypes.STRING,
    keys:DataTypes.ARRAY(DataTypes.STRING)
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
const Keys = db.define('keys', {
    name:DataTypes.STRING
}, {
    timestamps:false
})


Users.hasMany(Articles);
Articles.belongsTo(Users)
Users.hasMany(Comments);
Comments.belongsTo(Users)
Articles.hasMany(Comments);
Comments.belongsTo(Articles);
Categories.hasMany(Articles)
Articles.belongsTo(Categories)



module.exports = {
    Articles,
    Comments,
    Users,
    Categories,
    Keys
}