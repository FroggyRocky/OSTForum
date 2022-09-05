const express = require('express');
const app = express();
const db = require('./dbconnetction')
const dbmodel = require('./dbmodel')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const articleRouter = require('./routers/articles.router')
const authRouter = require('./routers/auth.router')
const userRouter = require('./routers/user.router')
const s3Router = require('./routers/s3.router')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const corsOptions = {
    origin:'*',
    credentials:true,
}
app.use(bodyParser.json())
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('common'))

app.use(cors(corsOptions))
db.authenticate()
    .then(() => console.log('db is connected'))
    .catch((e) => console.log(e))



app.use('/api', articleRouter);
app.use('/api', authRouter);
app.use('/api', userRouter)
app.use('/api', s3Router)

//  db.sync({alter:true});
 // db.sync({force:true})

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server is running on the port ' + PORT)
})


