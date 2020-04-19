const express = require("express")
const bcrypt = require('bcrypt')
const checkAuth = require('../../lib/check-auth.js')
const router = express.Router()
const Teacher = require('../../models/teacher')

router.get('/', checkAuth.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/', checkAuth.checkNotAuthenticated, async (req, res) => {
    let teachers
    try {
        teachers = await Teacher.find()
        console.log(teachers)
       
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const teacher = new Teacher ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
      
            console.log(teacher)
        const newTeacher = await teacher.save()
        console.log(newTeacher)
        //res.redirect(`authors/${newTeacher.id}`)
        res.redirect('/login')
    } catch (err) {
        console.log(err)
        res.redirect('/register')
    }

})

module.exports = router