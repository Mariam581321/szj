const express = require('express')
const checkAuth = require('../../lib/check-auth.js')
const passport = require('passport')
const router = express.Router()

router.get('/', checkAuth.checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

router.post('/', checkAuth.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router