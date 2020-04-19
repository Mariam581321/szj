const mongoose = require('mongoose')
//const Book = require('./book')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// authorSchema.pre('remove', function(next) {
//     Book.find( { author: this.id }, (err, books) => {
//         if (err) {
//             next(err)
//         } else if (books.length > 0) {
//             next(new Error('This author has books still.'))
//         } else {
//             next()
//         }
//     })
// })

module.exports = mongoose.model('Teacher', teacherSchema)