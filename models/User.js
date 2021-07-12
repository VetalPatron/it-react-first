const { Schema, model, Types } = require('mongoose')
const schema = new Schema({
    login: { type: String, reqired: true, unique: true },
    password: { type: String, requied: true },
    todos: [{ type: Types.ObjectId, ref: 'Todo' }]
})
module.exports = model('User', schema)