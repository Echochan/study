const mongoose =  require('mongoose')
const tagSchema = require('../schema/users')
module.exports = mongoose.model('Tag', tagSchema)