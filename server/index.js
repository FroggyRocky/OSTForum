const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const db = require('./dbconnetction')
const dbModel = require('./dbmodel')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const articleRouter = require('./routers/articles.router')
const authRouter = require('./routers/auth.router')
const userRouter = require('./routers/user.router')
const s3Router = require('./routers/s3.router')
const tapLinksRouter = require('./routers/taplinks.router')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const taplinksController = require('./controllers/taplinks')
const corsOptions = {
    origin:['http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials:true,
}
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('common'))
app.use(cors(corsOptions))
db.authenticate()
    .then(() => {
        checkTapLinks().then()
        console.log('db is connected')
    })
    .catch((e) => console.log(e))


async function checkTapLinks() {
    try {
        const taplinks = await dbModel.TapLinks.findAll()
        if(taplinks.length !== 0) return;
        await taplinksController.synchronizeLinks()
    } catch(e) {
        console.log(e)
    }
}
app.use('/api', articleRouter);
app.use('/api', authRouter);
app.use('/api', userRouter)
app.use('/api', s3Router)
app.use('/api', tapLinksRouter)
 // db.sync({alter:true});
// db.sync({force:true})

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server is running on the port ' + PORT)
})


