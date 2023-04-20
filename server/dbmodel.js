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
    header:DataTypes.STRING(25),
    description:DataTypes.STRING(210),
    cover:DataTypes.STRING,
    link:DataTypes.STRING,
    price:DataTypes.INTEGER,
    score:DataTypes.INTEGER,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }
})
const AffiliateKeys = db.define('affiliateKeys', {
    name:DataTypes.STRING,
},
    {
        timestamps: false
    }
)
const Networks = db.define('networks', {
    header:DataTypes.STRING(25),
    description:DataTypes.STRING(210),
    cover:DataTypes.STRING,
    link:DataTypes.STRING,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }
})
const NetworkKeys = db.define('networksKeys', {
        name:DataTypes.STRING,
    },
    {
        timestamps: false
    }
)
const Vacancies = db.define('vacancies', {
    header:DataTypes.STRING(25),
    description:DataTypes.STRING(210),
    cover:DataTypes.STRING,
    company:DataTypes.STRING,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    },
    data:DataTypes.JSON
})
const VacancyKeys = db.define('vacancyKeys', {
        name:DataTypes.STRING,
    },
    {
        timestamps: false
    }
)
const Cases = db.define('cases', {
    header:DataTypes.STRING(25),
    text:DataTypes.TEXT,
    description:DataTypes.STRING(210),
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
const CaseKeys = db.define('casesKeys', {
        name:DataTypes.STRING,
    },
    {
        timestamps: false
    }
)
const Services = db.define('services', {
    header:DataTypes.STRING(55),
    description:DataTypes.STRING(240),
    cover:DataTypes.STRING,
    link:DataTypes.STRING,
    score:DataTypes.INTEGER,
    keyIds:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }
})
const ServiceKeys = db.define('servicesKeys', {
        name:DataTypes.STRING,
    },
    {
        timestamps: false
    }
)
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
const Categories = db.define('categories', {
    name:DataTypes.STRING
}, {
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

module.exports = {
    Article,
    Comments,
    Users,
    Categories,
    RefreshTokens,
    TapLinks,
    Affiliates,
    Vacancies,
    Cases,
    Networks,
    Services,
    AffiliateKeys,
    NetworkKeys,
    CaseKeys,
    VacancyKeys,
    ServiceKeys
}