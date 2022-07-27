const express = require('express');
const app = express();
const PORT = 3001
const db = require('./dbconnetction')
const dbmodel = require('./dbmodel')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const articleRouter = require('./routers/articles.router')
app.use(bodyParser.json())
app.use(morgan('common'))

db.authenticate()
    .then(() => console.log('db is connected'))
    .catch((e) => console.log(e))


app.use('/api', articleRouter)

// db.sync({alter:true});
// db.sync({force:true})


app.listen(PORT, () => {
    console.log('Server is running on the port ' + PORT)
})


