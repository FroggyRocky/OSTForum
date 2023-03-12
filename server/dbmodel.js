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
const Affiliates = db.define('affiliates', {
    header:DataTypes.STRING(55),
    description:DataTypes.STRING(240),
    cover:DataTypes.STRING,
    link:DataTypes.STRING,
    price:DataTypes.INTEGER,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }
})
const Networks = db.define('networks', {
    header:DataTypes.STRING(55),
    description:DataTypes.STRING(240),
    cover:DataTypes.STRING,
    link:DataTypes.STRING,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }
})
const Vacancies = db.define('vacancies', {
    header:DataTypes.STRING(55),
    description:DataTypes.STRING(240),
    cover:DataTypes.STRING,
    link:DataTypes.STRING,
    price:DataTypes.INTEGER,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }
})
const Cases = db.define('cases', {
    header:DataTypes.STRING(55),
    text:DataTypes.TEXT,
    description:DataTypes.STRING(240),
    cover:DataTypes.STRING,
    link:DataTypes.STRING,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    },
    usersLiked: {
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO LIKED THE ARTICLE
    usersDisliked:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO DISLIKED THE ARTICLE
    usersViewed:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }, // ID OF USERS WHO LIKED VIEWED THE ARTICLE,
})
const Services = db.define('services', {
    header:DataTypes.STRING(55),
    description:DataTypes.STRING(240),
    cover:DataTypes.STRING,
    link:DataTypes.STRING,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }
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
const TapLinks = db.define('taplinks', {
    position:DataTypes.INTEGER,
},{
    timestamps:false
})
const RefreshTokens = db.define('refresh_tokens', {
    token:DataTypes.STRING
})

//article's CATEGORIES &
// vacancy, affiliate, network, service KEYS and TrustLevels
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
const ScoreLevel = db.define('score_levels', {
    label:DataTypes.STRING,
    score:DataTypes.INTEGER
},
    {
        timestamps:false
    })



Users.hasMany(Article);
Article.belongsTo(Users)
Users.hasMany(Comments);
Comments.belongsTo(Users)
Article.hasMany(Comments);
Comments.belongsTo(Article);
Article.hasOne(TapLinks)
TapLinks.belongsTo(Article)
ScoreLevel.hasMany(Affiliates)
Affiliates.belongsTo(ScoreLevel)


module.exports = {
    Article,
    Comments,
    Users,
    Categories,
    RefreshTokens,
    TapLinks,
    Keys,
    Affiliates,
    Vacancies,
    Cases,
    Networks,
    Services
}