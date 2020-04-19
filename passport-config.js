const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        console.log(email)
        const users = await getUserByEmail(email)
        console.log(users)
        let user = users[0]
        
        if (user == null) {
            return done(null, false, { message: 'No user with that email found.'})
        }
        try {
            console.log(password)
            console.log(user)
            console.log(user.email)
            console.log(user.password)
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect.'})
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
} 

module.exports = initialize