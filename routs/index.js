const express = require('express')
const checkAuth = require('../lib/check-auth.js')
const router = express.Router()

router.get('/', checkAuth.checkAuthenticated, (req, res) => {
    res.redirect('/login')
})

module.exports = router