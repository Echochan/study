const mongoose =  require('mongoose')
const tagSchema = require('../schema/tags')
module.exports = mongoose.model('Tag', tagSchema)