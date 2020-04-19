if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const Teacher = require('./models/teacher')

const indexRouter = require('./routs/index')
const loginRouter = require('./routs/login')
const registerRouter = require('./routs/register')

app.set('view-engine', 'ejs')
app.set('views', __dirname + '/views')

const mongoose = require('mongoose')
console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose.'))

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => {
            console.log('finding teacher')
            const teacher = Teacher.find({email: email}) 
           // console.log(teacher)
            return teacher
        },
    id => {
        return Teacher.find(user => {
            return user.id === id
        })
    }
)

app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}
))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)


app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

app.listen(process.env.PORT || 3000)
